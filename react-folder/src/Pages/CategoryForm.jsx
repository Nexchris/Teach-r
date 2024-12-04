import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Design from '../Assets/image/teachr-design.png'
import Background from '../background/arraybackground'

function CategoryForm() {
  const { id } = useParams(); // Si 'id' est présent, on est en mode édition
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/category/${id}`)
        .then((response) => setName(response.data.name))
        .catch(() => setErrorMessage('Failed to load category.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      let response;
      if (id) {
        // Mode édition : mettre à jour la catégorie
        response = await axios.put(`http://localhost:8000/api/category/${id}`, { name });
        setSuccessMessage('Category updated successfully!');
      } else {
        // Mode création : ajouter une nouvelle catégorie
        response = await axios.post('http://localhost:8000/api/category', { name });
        setSuccessMessage('Category created successfully!');
      }
    } catch (error) {
      setErrorMessage(id ? 'Failed to update category.' : 'Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      await axios.delete(`http://localhost:8000/api/category/${id}`);
      setSuccessMessage('Category deleted successfully!');
      setTimeout(() => navigate('/dashboard'), 1000); // Redirige après suppression
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage('Cannot delete category. It is linked to a product.');
      } else {
        setErrorMessage('Failed to delete category.');
      }
    } finally {
      setLoading(false);
      setConfirmDelete(false);
    }
  };

  return (
    <>
    <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      animation: 'fadeIn 3s',
      opacity: 0.9,
      zIndex: -2,
    }}
  >
<Background/>

  </Box>
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-lg text-center shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Category' : 'Create Category'}</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
<TextField
  label="Category Name"
  variant="outlined"
  fullWidth
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
  sx={{
    '& .MuiFormLabel-root': {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 'bold',
    },
    '& .MuiInputBase-input': {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 'bold',
    },
  }}
/>

            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
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
                  marginRight: '1rem'
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : id ? 'Edit' : 'Create'}
              </Button>
              <Button
                  variant="contained"
                  color="secondary"

                  onClick={() => navigate('/')}
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    transition: 'transform 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.3)',
                    },
                    borderRadius: '20px',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: '900',
                    
                  }}
                >
                  Back to Home
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
                      transform: 'scale(1.3)',
                    },
                    borderRadius: '20px',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: '900',
                  }}
                  onClick={() => setConfirmDelete(true)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Delete'}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>

        {/* Afficher les messages de succès ou d'erreur */}
        {successMessage && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setSuccessMessage('')}
          >
            <Alert onClose={() => setSuccessMessage('')} severity="success">
              {successMessage}
            </Alert>
          </Snackbar>
        )}
        {errorMessage && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setErrorMessage('')}
          >
            <Alert onClose={() => setErrorMessage('')} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        )}

        {/* Confirmation de suppression */}
        <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this category?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    </>
  );
}

export default CategoryForm;
