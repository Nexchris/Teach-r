import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const CEProductButton = ({ loading, editingProduct }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      disabled={loading}
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
    >
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        editingProduct ? 'Confirmer' : 'Confirmer'
      )}
    </Button>
  );
};

export default CEProductButton;
