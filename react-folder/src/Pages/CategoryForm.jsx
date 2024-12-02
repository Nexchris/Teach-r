import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
        .catch(() => setErrorMessage('Failed to load category.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.put(`http://localhost:8000/api/category/${id}`, { name });

      if (response.status === 200) {
        setSuccessMessage('Category updated successfully!');
      }
    } catch (error) {
      setErrorMessage('Failed to update category. Please try again.');
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
      setTimeout(() => navigate('/dashboard'), 1000); // 
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Category' : 'Create Category'}</h1>
        <form onSubmit={handleEdit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Edit'}
              </Button>
            </Grid>

            {id && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setConfirmDelete(true)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Delete'}
                </Button>
              </Grid>
            )}
          </Grid>
        </form>

        {}
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

        {}
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
  );
}

export default CategoryForm;
