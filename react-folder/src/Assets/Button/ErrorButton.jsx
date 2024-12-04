import React from 'react';
import { Button } from '@mui/material';

const ErrorButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: 'linear-gradient(to right, #ff724f 0%, #ffb6a3 100%)',
        color: 'white',
        transform: 'scale(1.3)',
        transition: 'transform 0.3s ease, background 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(to right, #ff724f 0%, red 100%)',
          transform: 'scale(1.6)',
        },
        borderRadius: '20px',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: '900',
      }}
      variant="contained"
    >
      Recharger
    </Button>
  );
};

export default ErrorButton;
