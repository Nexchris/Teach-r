import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CategoryForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/category', { name });

      if (response.status === 201) {
        setSuccessMessage('Category added successfully!');
        setName(''); 

        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            navigate('/');
          }, 500);
        }, 1000); 
      }
    } catch (error) {
      setErrorMessage('Failed to add category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-gray-100 min-h-screen flex items-center justify-center p-8 
        ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Create a New Category</h1>
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
                {loading ? <CircularProgress size={24} /> : 'Add Category'}
              </Button>
            </Grid>
          </Grid>
        </form>

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
      </div>
    </div>
  );
}

export default CategoryForm;
