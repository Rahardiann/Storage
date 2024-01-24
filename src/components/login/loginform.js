// LoginForm.js
import React from 'react';
import '../login/loginform.css';
import backgroundImage from '../../assets/login.png'; 
import logoSVG from '../../assets/logologin.svg';

const LoginForm = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   // Logika login dapat ditambahkan di sini
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  // };

  return (
    <div className="login-form">
      <div className="form-container">
        <img src={logoSVG} alt="Logo" className="logo" />
        <h2>Login</h2>
        <form>
          <div className="label-container">
            <label>
              <input type="text" placeholder="username" />
            </label>
            <label>
              <input type="password" placeholder="password" />
            </label>
          </div>
          <div className="button-container">
            <button type="button">Continue</button>
          </div>
        </form>
      </div>
      <div className="image-container">
        <img src={backgroundImage} alt="Background" />
      </div>
    </div>
  );
};

export default LoginForm;
