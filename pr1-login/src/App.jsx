import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./SignUp.jsx";
import Welcome from "./Welcome.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
