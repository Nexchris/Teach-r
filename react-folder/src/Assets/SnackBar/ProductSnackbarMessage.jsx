import React from 'react';
import { Snackbar, Alert } from '@mui/material';

function ProductSnackbarMessage({ successMessage, errorMessage, onClearSuccess, onClearError }) {
  return (
    <>
      {successMessage && (
        <Snackbar open autoHideDuration={6000} onClose={onClearSuccess}>
          <Alert onClose={onClearSuccess} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessage && (
        <Snackbar open autoHideDuration={6000} onClose={onClearError}>
          <Alert onClose={onClearError} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default ProductSnackbarMessage;
