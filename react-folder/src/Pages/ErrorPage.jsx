import React, { useState, useEffect } from 'react';
import { Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Profile from '../Assets/image/teachr-profile.png';
import Error from '../Assets/image/error-icon.png';
import 'animate.css';
import Button from '../Assets/Button/ErrorButton';

const ErrorPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  const handleReload = () => {
    window.location.reload(); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          animation: 'fadeIn 3s',
          opacity: 1,
          zIndex: 1,
        }}
      />


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 2,
        }}
        className={`flex flex-col space-y-4 px-4 sm:px-8 lg:px-16 ${
          fadeOut ? 'animate__animated animate__zoomOut' : 'animate__animated animate__zoomIn animate__duration-2s'
        }`}
      >
        <img
          src={Error}
          className="relative w-1/5 left-1.5 phone:w-2/5"
          alt="ERROR"
        />
        <Box className="flex flex-col justify-center items-center w-full text-center text-base space-y-6">
          <p className="text-6xl text-white font-black phone:text-4xl">Erreur critique</p>
          <p className="text-2xl font-black text-white">L'API ne répond pas.</p>
          <p style={{ marginTop: '0.5rem' }} className="text-2xl font-black text-white">
            Vérifiez que le serveur et la base de données sont activés.
          </p>
          <Button onClick={handleReload} > </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        message="ERR_CONNECTION_REFUSED"
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default ErrorPage;
