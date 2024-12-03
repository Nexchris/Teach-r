import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';  
import { setProducts, deleteProduct } from '../Store/Slices/productSlice';
import Background from '../Assets/image/bg-geometric.jpg';
import axios from 'axios';
import '../App.css';

import { useNavigate } from 'react-router-dom'; 
import { 
  Box,
  Button, 
  CircularProgress, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Dashboard() {
  const products = useSelector(state => state.products.products);  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState("products");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false); // State for create button menu
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/product')
      .then(response => {
        dispatch(setProducts(response.data));
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:8000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
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
        dispatch(deleteProduct(productToDelete.id));  // Suppression via Redux
        setOpenDeleteDialog(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const toggleCreateMenu = () => {
    setIsCreateMenuOpen((prev) => !prev);
  };
  const handleNavigateWithFadeOut = (targetPage) => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate(targetPage);
    }, 500);  // Delay to match the fade-out duration
  };

  return (
    <Box
    >
      <div className={`py-20 min-h-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>

        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              {currentDashboard === 'products' ? 'Product Dashboard' : 'Category Dashboard'}
            </h1>
          </div>
  
          <div className="flex space-x-4">
            <Select
              value={currentDashboard}
              onChange={(e) => setCurrentDashboard(e.target.value)}
              className="bg-white"
            >
              <MenuItem value="products">Product Dashboard</MenuItem>
              <MenuItem value="categories">Category Dashboard</MenuItem>
            </Select>
  
            <div className="relative">
              <Button
                variant="contained"
                color="primary"
                onClick={toggleCreateMenu}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create {isCreateMenuOpen ? '▲' : '▼'}
              </Button>
              {isCreateMenuOpen && (
                <div
                  className="absolute top-full mt-2 left-0 bg-white shadow-md rounded w-full origin-top"
                  style={{
                    transform: `scale(${isCreateMenuOpen ? 1 : 0})`,
                    opacity: isCreateMenuOpen ? 1 : 0,
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleNavigateWithFadeOut('/productform')}
                    className="py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Product
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => handleNavigateWithFadeOut('/categoryform')}
                    className="py-2 hover:bg-gray-100 text-gray-800"
                  >
                    Category
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            {currentDashboard === 'products' ? (
              <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-x-auto">
                <Table>
                  <TableHead className="bg-blue-600 text-white">
                    <TableRow>
                      <TableCell className="font-semibold">Name</TableCell>
                      <TableCell className="font-semibold">Price</TableCell>
                      <TableCell className="font-semibold">Description</TableCell>
                      <TableCell className="font-semibold">Category</TableCell>
                      <TableCell className="font-semibold">Creation Date</TableCell>
                      <TableCell className="font-semibold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-gray-100 transition-colors">
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.category?.name || 'N/A'}</TableCell>
                        <TableCell>{new Date(product.creation_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Edit />}
                              onClick={() => handleNavigateWithFadeOut(`/productform/${product.id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Delete />}
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
            ) : (
              <TableContainer component={Paper} className="shadow-lg rounded-lg overflow-x-auto">
                <Table>
                  <TableHead className="bg-blue-600 text-white">
                    <TableRow>
                      <TableCell className="font-semibold">Name</TableCell>
                      <TableCell className="font-semibold">Number of Products</TableCell>
                      <TableCell className="font-semibold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id} className="hover:bg-gray-100 transition-colors">
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.products?.length || 0}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Edit />}
                              onClick={() => handleNavigateWithFadeOut(`/categoryform/${category.id}`)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Delete />}
                              onClick={() => handleOpenDeleteDialog(category)}
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
          </>
        )}
      </div>
    </Box>
  );  
}  

export default Dashboard;
