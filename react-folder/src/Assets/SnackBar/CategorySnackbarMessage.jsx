import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CategorySnackbarMessage = ({ message, severity, onClose }) =>
  message ? (
    <Snackbar open autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  ) : null;

export default CategorySnackbarMessage;
