import { useState } from "react";
import backgroundImage from "../../assets/login.png";
import logoSVG from "../../assets/logologin.svg";
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

  const handleContinue = (e) => {
    e.preventDefault();
    // Lakukan validasi user jika perlu
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-80 p-20 flex flex-col items-center justify-center bg-white rounded-lg ">
          <img src={logoSVG} alt="Logo" className="logo" />
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form className="w-80 max-w-sm">
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
                onClick={handleContinue}
                className="w-64 bg-main hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-blue-300 flex items-center justify-center hidden sm:flex">
        <img src={backgroundImage} alt="Background" className="max-w-full" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
