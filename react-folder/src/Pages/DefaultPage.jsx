import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function Form() {
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

  useEffect(() => {
    axios.get('http://localhost:8000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching categories!', error);
      });
  }, []);

  useEffect(() => {
    if (isProductMode) {
      axios.get('http://localhost:8000/api/product')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching products!', error);
        });
    }
  }, [isProductMode]);

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category ? product.category.id : '');
    setEditingProduct(product);  
  };

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
          isProductMode ? 'http://localhost:8000/api/product' : 'http://localhost:8000/api/category', 
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
      }
    } catch (error) {
      setErrorMessage(isProductMode ? 'Failed to update product. Please check your input.' : 'Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (product) => {
    setProductToDelete(product);  
    setOpenDeleteDialog(true);    
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/${productToDelete.id}`);
      if (response.status === 200) {
        setSuccessMessage('Product deleted successfully!');
        setProducts(products.filter(product => product.id !== productToDelete.id)); 
        setOpenDeleteDialog(false); 
        setProductToDelete(null);    
      }
    } catch (error) {
      setErrorMessage('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);  
  };

  return (
    <div>
      <h1>{editingProduct ? 'Edit Product' : (isProductMode ? 'Create a New Product' : 'Create a New Category')}</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
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
              {loading ? <CircularProgress size={24} /> : (editingProduct ? 'Edit Product' : (isProductMode ? 'Create Product' : 'Create Category'))}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setIsProductMode(!isProductMode)}  
            >
              {isProductMode ? 'Switch to Category Form' : 'Switch to Product Form'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success or error message */}
      {successMessage && (
        <Snackbar
          open={true}
          message={successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
        />
      )}
      {errorMessage && (
        <Snackbar
          open={true}
          message={errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage('')}
        />
      )}

      {isProductMode && products.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category ? product.category.name : 'N/A'}</TableCell>
                  <TableCell>{product.creation_date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(product)} color="primary">Edit</Button>
                    <Button onClick={() => handleOpenDeleteDialog(product)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">No</Button>
          <Button onClick={handleDelete} color="secondary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
