import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Store/Slices/productSlice';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Background from '../Assets/image/bg-geometric.jpg';
import Design from '../Assets/image/teachr-design.png';
import Profile from '../Assets/image/teachr-profile.png';
import Dashboard from './Dashboard';

export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleReload = () => {
    // Recharger la page
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const goToFormPage = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/productform');
    }, 500); // Attente de l'animation fade-out avant de changer de page
  };

  const handleAuthentication = () => {
    if (userName.trim()) {
      setIsAuthenticated(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        
        }}
      >
        <Typography variant="h6" color="white" textAlign="center">Chargement...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
      
        }}
      >
        <Typography variant="h6" color="white" textAlign="center">Erreur : {error}</Typography>
        
        <Button
          onClick={handleReload}
          sx={{
            background: 'linear-gradient(to right, #ff724f 0%, #ffb6a3 100%)',
            color: 'white',
            transition: 'transform 0.3s ease, background 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(to right, #ff724f 0%, #dc3545 100%)',
              transform: 'scale(1.05)',
            },
            borderRadius: '20px',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: '900',
          }}
          variant="contained"
        >
          Relancer
        </Button>

        {/* Snackbar pour afficher un message d'erreur */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            Il y a un problème avec le serveur. Veuillez réessayer.
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return products.length > 0 || isAuthenticated ? (
    <Dashboard />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      className={`flex flex-col space-y-4 px-4 sm:px-8 lg:px-16 ${fadeOut ? 'fadeOut' : ''}`}
    >
           <img src={Profile} className="relative w-1/5 left-1.5 fadeInDelay1 phone:w-2/5" alt="" />
      <Box className="flex flex-col justify-center items-center w-full text-center text-base space-y-6">
        <p
          variant="h1"
          component="p"
          color="white"
          className="text-6xl text-white font-black fadeIn"
        >
          Bienvenue
        </p>
        <p
          variant="h2"
          component="p"
          color="white"
          className="text-2xl font-black text-white fadeInDelay1"
        >
          Pour construire des produits et des catégories
        </p>
        <p
          variant="h2"
          component="p"
          className="text-2xl font-black text-white fadeInDelay2"
        >
          Veuillez saisir votre nom
        </p>

        {!isAuthenticated ? (
          <Box className="space-y-4 w-fit sm:w-96 grid">
<TextField
  label="Entrez votre nom"
  variant="filled" // Assurez-vous que la variante est correcte
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
  required
  sx={{
    fontWeight: 'bold',
    '& .MuiFilledInput-root': {
      backgroundColor: 'transparent', // Fond transparent
      textAlign: 'center', // Texte centré
      color: 'white', // Texte en blanc
      fontFamily: 'Nunito, sans-serif', // Police Nunito
      fontWeight: 'bold', // Texte en gras
      '&:before': {
        borderBottom: '2px solid white', // Bordure blanche par défaut
      },
      '&:hover:before': {
        borderBottom: '2px solid gray', // Bordure grise au survol
      },
      '&:after': {
        borderBottom: '2px solid white', // Bordure blanche en focus
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label blanc par défaut
      fontFamily: 'Nunito, sans-serif', // Police Nunito pour le label
      fontWeight: 'bold', // Label en gras
      '&:hover': {
        color: 'gray', // Label gris au survol
      },
      '&.Mui-focused': {
        color: 'white', // Label blanc en focus
      },
    },
  }}
  className="fadeInDelay3"
/>



            <Button
              onClick={handleAuthentication}
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
                color: 'white',
                transition: 'transform 0.3s ease, background 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
                  transform: 'scale(1.05)',
                },
                borderRadius: '20px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: '900',
              }}
              className="fadeInDelay4"
            >
              Authentification
            </Button>
          </Box>
        ) : (
          <Typography variant="h4" color="white" className="text-xl sm:text-2xl fadeInDelay4">
            Bienvenue {userName} !
          </Typography>
        )}

        <Button
          onClick={goToFormPage}
          sx={{
            background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
            color: 'white',
            transition: 'transform 0.3s ease, background 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
              transform: 'scale(1.05)',
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
}
