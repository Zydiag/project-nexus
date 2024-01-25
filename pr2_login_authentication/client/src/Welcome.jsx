import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="Welcome">
      <div className="heading">
        Welcome to
        <span className="title2"> CUISINE</span>
      </div>
      <div className="btContainer">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>SignUP</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
