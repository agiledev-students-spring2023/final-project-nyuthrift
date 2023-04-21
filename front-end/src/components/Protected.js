import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authenticate');
        if (response.status === 200) {
          setAuthenticated(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return authenticated ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
