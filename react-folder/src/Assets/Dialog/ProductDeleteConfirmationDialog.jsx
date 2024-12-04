import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>Êtes-vous sûr de vouloir supprimer ce produit ?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Annuler</Button>
        <Button onClick={onConfirm} color="secondary">Supprimer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
