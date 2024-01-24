// LoginForm.js
import { useState, react } from "react";
import "../login/loginform.css";
import backgroundImage from "../../assets/login.png";
import logoSVG from "../../assets/logologin.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = {
      username: user.username,
      password: user.password,
    };
    // console.log(data)

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        data
      );

      console.log(response.data.data);

      if (response.data.data.length === 0) {
        toast.info("Username / Password tidak ditemukan");
        window.location.reload();
      } else {
        sessionStorage.setItem("id_user", response.data.data.id);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Error");
    }
  };

  return (
    <div className="login-form">
      <div className="form-container">
        <img src={logoSVG} alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="label-container">
            <label>
              <input
                type="text"
                placeholder="username"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="button-container">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
      <div className="image-container">
        <img src={backgroundImage} alt="Background" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
