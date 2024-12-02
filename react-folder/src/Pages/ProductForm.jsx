import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
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
import { setCategories, addProduct, updateProduct, deleteProduct } from '../Store/Slices/productSlice'; 

function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const categories = useSelector(state => state.products.categories); 
  const editingProduct = useSelector(state => state.products.products.find(product => product.id === parseInt(productId)));

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false); 

  useEffect(() => {
    if (categories.length === 0) {
      axios
        .get('http://localhost:8000/api/category')
        .then((response) => {
          dispatch(setCategories(response.data));
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    }
  }, [categories, dispatch]);
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category?.id || '');
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = {
      name,
      price,
      description,
      category,
    };

    try {
      let response;
      if (editingProduct) {
        response = await axios.put(`http://localhost:8000/api/product/${editingProduct.id}`, data);
        if (response.status === 200) {
          dispatch(updateProduct(response.data));
        }
      } else {
        response = await axios.post('http://localhost:8000/api/product', data);
        if (response.status === 201) {
          dispatch(addProduct(response.data));
        }
      }

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setIsFadingOut(false);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(editingProduct ? 'Failed to update product.' : 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/${editingProduct.id}`);
      if (response.status === 200) {
        dispatch(deleteProduct(editingProduct.id));
        setSuccessMessage('Product deleted successfully!');
        setIsFadingOut(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage('Failed to delete product.');
    } finally {
      setConfirmDelete(false);
    }
  };

  return (
    <div className={`bg-gray-100 min-h-screen p-8 ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">{editingProduct ? 'Edit Product' : 'Create Product'}</h1>
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

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </Grid>

            {/* Bouton Delete Product si on est en mode édition */}
            {editingProduct && (
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete Product
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>

      {}
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

      {}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductForm;
