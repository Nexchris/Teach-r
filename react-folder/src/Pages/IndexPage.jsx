import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Store/Slices/productSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Background from '../Assets/image/bg-geometric.jpg';
import Design from '../Assets/image/teachr-design.png';
import Profile from '../Assets/image/teachr-profile.png';
import Dashboard from './Dashboard';

export default function CircularIndeterminate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography variant="h6" color="white" textAlign="center">Erreur : {error}</Typography>
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
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={`flex flex-col space-y-4 px-4 sm:px-8 lg:px-16 ${fadeOut ? 'fadeOut' : ''}`}
    >
            <img src={Profile} className='relative w-1/6 left-1.5 fadeInDelay1' alt="" />
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
          <Box className="space-y-4 w-full sm:w-96">
            <TextField
              label="Entrez votre nom"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              sx={{
                fontWeight: 'bold',
              }}
              className="fadeInDelay3"
            />
            <Button
              onClick={handleAuthentication}
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
                fontWeight: 'bold',
                borderRadius: '20px',
                transition: 'transform 0.3s ease, background 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
                  transform: 'scale(1.05)',
                },
              }}
              fullWidth
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
