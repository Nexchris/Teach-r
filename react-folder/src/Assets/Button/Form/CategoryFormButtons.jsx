import React from 'react';
import { Button, Grid, CircularProgress } from '@mui/material';

const CategoryFormButtons = ({ id, loading, onSubmit, onDelete, onCancel }) => (
  <Grid container spacing={3} sx={{ marginTop: '0.5rem', textAlign: 'center' }}>
    <Grid item xs={12}>
      <Button
        variant="contained"
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
          marginRight: '1rem',
        }}
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : id ? 'Modifier' : 'Créer'}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onCancel}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          transition: 'transform 0.3s ease, background 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          borderRadius: '20px',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: '900',
        }}
      >
        Retour à l'accueil
      </Button>
    </Grid>
    {id && (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
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
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Supprimer'}
        </Button>
      </Grid>
    )}
  </Grid>
);

export default CategoryFormButtons;
