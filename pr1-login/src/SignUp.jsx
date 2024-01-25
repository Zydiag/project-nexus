import Logo from "./assets/logo.png";

const SignUp = () => {
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
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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
