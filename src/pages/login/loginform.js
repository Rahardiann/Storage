import { useState } from "react";
import "../login/loginform.css";
import backgroundImage from "../../assets/login.png";
import logoSVG from "../../assets/logologin.svg";
import axios from '../../config/axiosConfig';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    try {
      const response = await axios.post(
        "/user/login",
        data
      );

      console.log(response.data.data);

      if (response.data.data.length === 0) {
        toast.info("Username / Password tidak ditemukan");
        window.location.reload();
      } else {
        sessionStorage.setItem("id_user", response.data.data.id);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Error");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-80 p-20 flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
          <img src={logoSVG} alt="Logo" className="logo" />
          <h2  className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form onSubmit={handleLogin} className="w-80 max-w-sm">
            <div className="w-full justify-center mb-15">
              <input
                type="text"
                placeholder="username"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
                className="w-80 px-4 my-4 py-3 rounded-3xl border-2 border-gray-300 bg-gray-300"
              />
            </div>
            <div className="w-full mb-15">
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
                className="w-80 px-4 py-3 mb-8 rounded-3xl border-2  border-black-300 bg-gray-300"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-64 bg-main hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-blue-300 flex items-center justify-center">
        <img src={backgroundImage} alt="Background" className="max-w-full" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
