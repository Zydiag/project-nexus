import { useState } from "react";
import Logo from "./assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const url = "http://localhost:3000/api/v1/users";
    try {
      const res = await axios.post(`${url}/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
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
          <form action="/" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <p className="link">
          Don&apos;t have an account? <a href="">Sign Up</a>
        </p>
      </div>
      <div className="rightSide"></div>
    </div>
  );
};

export default Login;
