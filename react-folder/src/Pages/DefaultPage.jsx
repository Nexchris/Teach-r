import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
      console.log("Data to be sent:", data);
      
      const response = await axios.post(
        isProductMode ? 'http://localhost:8000/api/product' : 'http://localhost:8000/api/category', 
        data
      );
      
      console.log("Response received:", response); 
      
      if (response.status === 201) {
        setSuccessMessage(isProductMode ? 'Product added successfully!' : 'Category added successfully!');

        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
      } else {
        console.error("Unexpected response status:", response.status); 
      }
    } catch (error) {
      console.error("Error during product/category creation:", error); 
      
      if (error.response) {
        console.error("Error response from server:", error.response); 
        setErrorMessage(isProductMode ? 'Failed to add product. Please check your input.' : 'Failed to add category.');
      } else if (error.request) {
        console.error("No response received from server:", error.request); 
        setErrorMessage('Server did not respond. Please try again later.');
      } else {
        console.error("Error message:", error.message); 
        setErrorMessage('Failed to add product/category. An error occurred.');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h1>{isProductMode ? 'Create a New Product' : 'Create a New Category'}</h1>
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
              {loading ? <CircularProgress size={24} /> : (isProductMode ? 'Create Product' : 'Create Category')}
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

      {}
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
                  <TableCell>{product.creation_date}</TableCell> {/* Correction ici */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Form;
