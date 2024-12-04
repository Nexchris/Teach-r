import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const CategoryDeleteConfirmationDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmer la suppression</DialogTitle>
    <DialogContent>Êtes-vous sûr de vouloir supprimer cette catégorie ?</DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Annuler
      </Button>
      <Button onClick={onConfirm} color="secondary">
        Supprimer
      </Button>
    </DialogActions>
  </Dialog>
);

export default CategoryDeleteConfirmationDialog;
