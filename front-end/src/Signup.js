import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './styles/Signup.css'
import axios from 'axios';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignUp = async event => {    

    event.preventDefault();

    try {
      const payload = {username, password};
      axios.post(`${process.env.REACT_APP_API_URL}/signup`, payload)
      .then(response => {
        alert("Account created Successfully!");
        navigate('/signin');
      })
      .catch(error => {
        alert("Username already exists!");
      })

    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <StyledContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTextField
            label="Create Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <StyledTextField
            label="Create Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Sign Up
        </StyledButton>
      </form>
      <div style={{ marginTop: '16px' }}>
        <p>Already have an account?</p>
        <Link to="/signin">Log in here</Link>
      </div>
    </StyledContainer>
  );
}

export default SignUp;
