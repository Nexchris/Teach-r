import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Store/Slices/productSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Background from '../Assets/image/teachr-background.png';
import Design from '../Assets/image/teachr-design.png';
import Dashboard from './Dashboard';

export default function CircularIndeterminate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const goToFormPage = () => {
    navigate('/productform');
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
        <p className="text-center text-lg text-white">Chargement...</p>
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
        <p className="text-center text-lg text-white">Erreur : {error}</p>
      </Box>
    );
  }

  return products.length > 0 ? (
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
      className="flex flex-col space-y-4"
    >
      <Box className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col justify-center space-y-4 w-1/2 items-center">
          <p className="text-center text-7xl text-white">Bienvenue, cher client</p>
          <p className="text-center text-5xl text-white w-1/2">
            Il semble que vous n'avez pas encore de produits, créons un ensemble !
          </p>
          <Button
            onClick={goToFormPage}
            sx={{
              background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
              },
            }}
            variant="contained"
          >
            Créer un Produit
          </Button>
        </div>
        <img
          src={Design}
          alt="Design"
          className="max-w-full h-auto w-1/2 mx-auto translate-y-40 translate-x-40"
        />
      </Box>
    </Box>
  );
}
