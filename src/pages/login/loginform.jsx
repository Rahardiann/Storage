import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../config/axiosConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("admin/login", {
        email: user.email,
        password: user.password,
      });

      console.log(response.data)
      const token = response.data.data; // Assuming your backend sends back a token upon successful login

      sessionStorage.setItem("token", token); // Save the token to local storage

      navigate("/dashboard"); // Redirect to the dashboard or any other page upon successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Password atau username mungkin salah!");
    }
  };

  return (
    <div className="bg-abu min-h-screen flex items-center justify-center">
      <div className="relative w-96 md:w-1/4">
        <img
          src={loginImage}
          alt="Login"
          className="absolute top-[-75px] left-1/2 transform -translate-x-1/2  h-40"
        />
        <div className="bg-custom-grey rounded-lg shadow-2xl p-8 mt-16">
          <form onSubmit={handleLogin}>
            {" "}
            {/* Wrap content inside a form and handle submission */}
            {/* Email Input */}
            <div className="relative mb-4">
              <h2 className="text-left text-md text-black">Email</h2>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full p-2 pl-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
            {/* Password Input */}
            <div className="relative mb-6">
              <h2 className="text-left text-md text-black">Password</h2>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="w-full p-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="pr-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white font-bold bg-main rounded-full hover:bg-second focus:outline-none focus:shadow-outline-gray"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
