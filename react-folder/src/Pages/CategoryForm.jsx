import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../background/arraybackground';
import FormButtons from '../Assets/Button/Form/CategoryFormButtons';
import DeleteConfirmationDialog from '../Assets/Dialog/CategoryDeleteConfirmationDialog';
import SnackbarMessage from '../Assets/SnackBar/CategorySnackbarMessage';

function CategoryForm() {
  const { id } = useParams();
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
        .catch(() => setErrorMessage('Échec du chargement de la catégorie.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/category/${id}`, { name });
        setSuccessMessage('Catégorie mise à jour avec succès !');
      } else {
        await axios.post('http://localhost:8000/api/category', { name });
        setSuccessMessage('Catégorie créée avec succès !');
      }

      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setErrorMessage(id ? 'Échec de la mise à jour de la catégorie.' : 'Échec de la création de la catégorie.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage('');
  
    try {
      await axios.delete(`http://localhost:8000/api/category/${id}`);
      setSuccessMessage('Catégorie supprimée avec succès !');
  
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      setErrorMessage('Échec de la suppression de la catégorie.');
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
          opacity: 0.7,
          backgroundColor: 'black',
          zIndex: -2,
        }}
      >
        <Background />
      </Box>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white rounded-lg text-center shadow-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {id ? 'Modifier la catégorie' : 'Créer une catégorie'}
          </h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom de la catégorie"
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
            <FormButtons
              id={id}
              loading={loading}
              onSubmit={handleSubmit}
              onDelete={() => setConfirmDelete(true)}
              onCancel={() => navigate('/')}
            />
          </form>

          <SnackbarMessage
            message={successMessage || errorMessage}
            severity={successMessage ? 'success' : 'error'}
            onClose={() => {
              setSuccessMessage('');
              setErrorMessage('');
            }}
          />

          <DeleteConfirmationDialog
            open={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            onConfirm={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryForm;
