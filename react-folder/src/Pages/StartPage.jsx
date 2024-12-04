import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Profile from '../Assets/image/teachr-profile.png';
import 'animate.css';

const StartPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const goToFormPage = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/productform');
    }, 500); // Attente de l'animation fade-out avant de changer de page
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      className={`flex flex-col space-y-4 px-4 sm:px-8 lg:px-16 ${
        fadeOut ? 'animate__animated animate__zoomOut' : 'animate__animated animate__zoomIn animate__duration-2s'
      }`}
    >
      <img
        src={Profile}
        className="relative w-1/5 left-1.5 phone:w-2/5"
        alt="Profil"
      />
      <Box className="flex flex-col justify-center items-center w-full text-center text-base space-y-6">
        <p
          variant="h1"
          component="p"
          className="text-6xl text-white font-black phone:text-5xl"
        >
          Bienvenue, client
        </p>

        <p
          variant="h2"
          component="p"
          className="text-2xl font-black text-white"
        >
          Vous n'avez pas encore de produits…
        </p>
        <p
          variant="h2"
          component="p"
          style={{ marginTop: '0.5rem' }}
          className="text-2xl font-black text-white"
        >
          Pourquoi ne pas commencer à en créer dès maintenant ?
        </p>
        <Button
          onClick={goToFormPage}
          sx={{
            background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
            color: 'white',
            transition: 'transform 0.3s ease, background 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
              transform: 'scale(1.3)',
            },
            borderRadius: '20px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '900',
          }}
          variant="contained"
        >
          Créer un Produit
        </Button>
      </Box>
    </Box>
  );
};

export default StartPage;
