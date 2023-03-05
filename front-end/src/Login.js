import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        history.push('/home')    
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
    </div>
    );
}
export default Login;