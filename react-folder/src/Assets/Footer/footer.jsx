import React from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material'; 

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
        py: 4,
        mt: 6,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://facebook.com" target="_blank" className="text-white hover:text-blue-500">
            <Facebook />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="text-white hover:text-blue-400">
            <Twitter />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="text-white hover:text-pink-500">
            <Instagram />
          </Link>
        </div>
        <Typography variant="body2" component="p" sx={{ mb: 1 }}>
          <span>© 2024 VotreNom. Tous droits réservés.</span>
        </Typography>

        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="text-white hover:text-gray-400">
            À propos
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
          <Link href="/privacy" className="text-white hover:text-gray-400">
            Politique de confidentialité
          </Link>
        </div>

        {}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1f87ff',
            '&:hover': { backgroundColor: '#005bcb' },
          }}
        >
          Abonnez-vous à notre newsletter
        </Button>
      </div>
    </Box>
  );
};

export default Footer;
