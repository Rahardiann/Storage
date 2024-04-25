import { useState } from "react";
import backgroundImage from "../../assets/login.png";
import logoSVG from "../../assets/logologin.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("admin/login", {
        // Adjust the endpoint as per your backend API
        email: user.email,
        password: user.password,
      });

      // Assuming your backend sends back a token upon successful login
      const token = response.data.token;

      // You can save the token to local storage or session storage for later use
      localStorage.setItem("token", token);

      // Redirect to the dashboard or any other page upon successful login
      navigate("/dashboard");
    } catch (error) {
      // Handle error
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-80 p-20 flex flex-col items-center justify-center bg-white rounded-lg ">
          <img src={logoSVG} alt="Logo" className="logo" />
          <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
          <form className="w-80 max-w-sm" onSubmit={handleLogin}>
            <div className="w-full justify-center mb-15">
              <input
                type="text"
                placeholder="email"
                name="email"
                id="email"
                value={user.email}
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
      <div className="flex-1 bg-blue-300 flex items-center justify-center hidden sm:flex">
        <img src={backgroundImage} alt="Background" className="max-w-full" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
