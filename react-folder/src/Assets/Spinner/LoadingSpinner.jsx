import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import 'animate.css';

const LoadingSpinner = () => {
  const [fadeIn, setFadeIn] = useState(false);

 
  useEffect(() => {
    setFadeIn(true); 
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <CircularProgress sx={{ marginBottom: 2, color: 'white' }} size={200} />
      <Typography
        variant="h4"
        component="p"
        sx={{
          fontFamily: 'Nunito',
          fontWeight: 'bold',
          color: '#ffffff',
          marginTop: '5rem',
          textAlign: 'center'

        }}
        className={` animate__animated ${fadeIn ? 'animate__fadeIn' : ''}`}
      >
        <p className='phone:text-1xl'>Connexion à la base de données et au serveur en cours...</p>
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
