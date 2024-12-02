import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';  
import { setProducts, deleteProduct } from '../Store/Slices/productSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function Dashboard() {
  const products = useSelector(state => state.products.products);  
  const [loading, setLoading] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/product')
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(error => {
        console.error('Il y a eu une erreur avec la récupération des produits!', error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleOpenDeleteDialog = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/${productToDelete.id}`);
      if (response.status === 200) {
        dispatch(deleteProduct(productToDelete.id));  // Suppression du produit via Redux
        setOpenDeleteDialog(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error('Échec de la suppression du produit.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product Dashboard</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/productform')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Créer un produit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/categoryform')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Créer une catégorie
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="shadow-lg">
          <Table>
            <TableHead className="bg-blue-500">
              <TableRow>
                <TableCell className="text-white font-semibold">ID</TableCell>
                <TableCell className="text-white font-semibold">Name</TableCell>
                <TableCell className="text-white font-semibold">Price</TableCell>
                <TableCell className="text-white font-semibold">Description</TableCell>
                <TableCell className="text-white font-semibold">Category</TableCell>
                <TableCell className="text-white font-semibold">Creation Date</TableCell>
                <TableCell className="text-white font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-100">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category ? product.category.name : 'N/A'}</TableCell>
                  <TableCell>{product.creation_date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => navigate(`/productform/${product.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Delete />}
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleOpenDeleteDialog(product)}
                      >
                        Delete
                      </Button>
                    </div>
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
          <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
