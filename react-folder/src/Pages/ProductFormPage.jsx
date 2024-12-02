import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

function Form() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProductMode, setIsProductMode] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isFadingOut, setIsFadingOut] = useState(false); 

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (isProductMode) {
      axios
        .get('http://localhost:8000/api/product')
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [isProductMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = {
      name,
      price: isProductMode ? price : undefined,
      description: isProductMode ? description : undefined,
      category: isProductMode ? category : undefined,
    };

    try {
      let response;
      if (editingProduct) {
        response = await axios.put(`http://localhost:8000/api/product/${editingProduct.id}`, data);
      } else {
        response = await axios.post(
          isProductMode
            ? 'http://localhost:8000/api/product'
            : 'http://localhost:8000/api/category',
          data
        );
      }

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(isProductMode ? 'Product updated successfully!' : 'Category added successfully!');
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setEditingProduct(null);

    // Attendre la fin de l'animation fade-out avant de rediriger
    setTimeout(() => {
      setIsFadingOut(false); // Réinitialiser pour permettre une nouvelle animation
      navigate('/'); // Rediriger après la durée de l'animation
    }, 3000); // Durée de l'animation fade-out
  }
    } catch (error) {
      setErrorMessage(
        isProductMode ? 'Failed to update product. Please check your input.' : 'Failed to add category.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  return (
    <div className={`bg-gray-100 min-h-screen p-8 ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {editingProduct ? 'Edit Product' : isProductMode ? 'Create Product' : 'Create Category'}
        </h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            {isProductMode && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : editingProduct ? 'Edit Product' : 'Create Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      {/* Snackbar for notifications */}
      {successMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert onClose={() => setSuccessMessage('')} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessage && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
          <Alert onClose={() => setErrorMessage('')} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={() => handleDelete(productToDelete)} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
