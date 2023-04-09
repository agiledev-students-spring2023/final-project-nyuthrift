import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idImage, setIdImage] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleImageChange = (event) => {
    setIdImage(event.target.files[0]);
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    navigate('/signin');
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
        <div style={{ marginTop: '16px' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="id-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="id-image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload ID Image
            </Button>
          </label>
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
