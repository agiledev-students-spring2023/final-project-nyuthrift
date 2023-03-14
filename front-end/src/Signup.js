import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(8),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  logo: {
    display: 'none',
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    marginTop: theme.spacing(1),
  },
  signUpLink: {
    marginTop: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
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
    navigate('/login');
  }

  return (
    <div className={classes.container}>
      <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="Logo" className={classes.logo} />
      <h2 className={classes.title}>Sign Up</h2>
      <form onSubmit={handleSignUp} className={classes.form}>
        <TextField
          label="Create Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          className={classes.textField}
          required
        />
        <TextField
          label="Create Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={classes.textField}
          required
        />
        <input
          accept="image/*"
          className={classes.input}
          id="id-image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="id-image-upload">
          <Button
            variant="contained"
            component="span"
            className={classes.uploadButton}
            startIcon={<CloudUploadIcon />}
          >
            Upload ID Image
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Sign Up
        </Button>
      </form>
      <div className={classes.signUpLink}>
        <p>Already have an account?</p>
        <Link to="/signin">Log in here</Link>
      </div>
    </div>
  );
}

export default SignUp;
