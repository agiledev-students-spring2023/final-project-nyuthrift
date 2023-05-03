import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/home')    
    }
    return(
        <div className="login-container" >
      <img src = {process.env.PUBLIC_URL + '/images/logo.jpg'}  alt= "Logo" className="login-logo"/>
      <h2 className ="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label className="login-label" >
          Username:     
          <input type="username" value={username} onChange={handleUsernameChange} className="login-input"/>
        </label>
        <label className="login-label">
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} className="login-input"/>
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signUpLink">Don't have an account?</p><Link to="/signup">Sign Up Here</Link>
    </div>
    );
}
export default Login;