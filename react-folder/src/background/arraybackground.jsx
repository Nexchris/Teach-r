import React from 'react';
import Design from '../Assets/image/teachr-design.png';
import { Box } from '@mui/material';  // Importation de Box de Material UI

const BackgroundImages = () => {
  return (
    <>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '4rem',
        overflow: 'hidden',
        height: '90vh',
        // Media query pour afficher les images à partir de 768px
        '@media (min-width: 768px)': {
          display: 'flex',  // Assurez-vous que le conteneur utilise flexbox à partir de 768px
        },
        '@media (max-width: 767px)': {
          display: 'none', // Masque les images si l'écran est plus petit que 768px
        },
      }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <img
          key={index}
          src={Design}
          alt={`design-${index}`}
          className="w-1/4"
        />
      ))}
    </Box>
    
    </>
  );
};

export default BackgroundImages;
