import React from 'react';
import { Button } from '@mui/material';

const CreateCategoryButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        background: 'linear-gradient(to right, #005bcb 0%, #1f87ff 100%)',
        color: 'white',
        transition: 'transform 0.3s ease, background 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(to right, #0046a0 0%, #1a6bb0 100%)',
          transform: 'scale(1.1)',
        },
        borderRadius: '20px',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: '900',
        padding: '8px 16px',
      }}
    >
      Créer une catégorie
    </Button>
  );
};

export default CreateCategoryButton;
