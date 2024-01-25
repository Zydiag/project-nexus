import { asyncHandler } from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { apiResponse } from '../utils/apiResponse.js'
import jwt from 'jsonwebtoken'

// * try using user instead of userId
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    const savedUser = await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new apiError(500, error.message)
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)
  if (!username || !email || !password) {
    throw new apiError(400, 'All fields are required')
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (existedUser) throw new apiError(409, 'email or username already exists')
  const user = await User.create({
    username,
    email,
    password,
    username: username.toLowerCase(),
  })
  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )
  if (!createdUser) throw new apiError(500, 'user not created')
  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        createdUser,
        'User created Successfully. Now you can login'
      )
    )
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  if (!email) throw new apiError(400, 'username or email is required')
  const user = await User.findOne({ email })
  if (!user) throw new apiError(404, 'user not found')
  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if (!isPasswordCorrect) throw new apiError(400, 'invalid credentials')
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  )
  const options = {
    httpOnly: true,
    secure: true,
  }
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: user,
          accessToken,
          refreshToken,
        },
        'user logged in successfully'
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  )
  const options = {
    httpOnly: true,
    secure: true,
  }
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new apiResponse(200, {}, 'user logged out'))
})

const refreshAccessAndToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken) throw new apiError(401, 'unauthorized access')
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
    const user = await User.findById(decodedToken?._id)
    if (!user) throw new apiError(401, 'Invalid refresh Token')
    if (incomingRefreshToken !== user.refreshToken)
      throw new apiError(401, 'refresh token expired or used')
    const options = {
      httpOnly: true,
      secure: true,
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )
    return res
      .status(200)
      .cookies('accessToken', accessToken, options)
      .cookies('refreshToken', refreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken },
          'access token updated successfully'
        )
      )
  } catch (error) {
    throw new apiError(401, error?.message || 'invalid refresh token')
  }
})

export { registerUser, loginUser, logoutUser, refreshAccessAndToken }
