import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSignIn = async event => {
    event.preventDefault();
    

    try {
      const payload = {username, password};
      axios.post('http://localhost:3000/signin', payload)
  
      .then(response => {
        alert("Logged in Sucessfully!");
        navigate('/home');
      })
      .catch(error => {
        alert(error.response.data.errors.message);
      })
      
      
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledContainer>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <StyledTextField
          label="Enter Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledTextField
            label="Enter Password"
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
        >
          Log In
        </StyledButton>
      </form>
      <div style={{ marginTop: '16px' }}>
        <p>Don't have an account?</p>
        <Link to="/signup">Sign up here</Link>
      </div>
    </StyledContainer>
  );
}

export default Signin;
