import Logo from "./assets/logo.png";
const Login = () => {
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
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <button>Login</button>
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
