import React from 'react';
import { Button } from '@mui/material';

const DeleteProductButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      sx={{
        background: 'linear-gradient(to right, #ff724f 0%, #ffb6a3 100%)',
        color: 'white',
        transition: 'transform 0.3s ease, background 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(to right, #ff724f 0%, red 100%)',
          transform: 'scale(1.1)',
        },
        borderRadius: '20px',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: '900',
      }}
    >
      Supprimer
    </Button>
  );
};

export default DeleteProductButton;
