import { useState } from "react";
import Logo from "./assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const url = "http://localhost:3000/api/v1/users";
    try {
      const res = await axios.post(`${url}/register`, {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="leftSide">
        <div className="logoContainer">
          <img src={Logo} alt="logo" className="logo" />
          <span className="title">
            Code
            <span className="title2">Cuisine</span>
          </span>
        </div>
        <div className="inputContainer">
          <form onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </div>
        <p className="link">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
      <div className="rightSide"></div>
    </div>
  );
};

export default SignUp;
