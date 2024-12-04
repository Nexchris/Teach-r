import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';  
import { setProducts, deleteProduct } from '../Store/Slices/productSlice';
import Background from '../Assets/image/bg-geometric.jpg';
import axios from 'axios';
import '../App.css';
import Dashboard2 from './CurrentDashboard';
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
  MenuItem, 
  TextField 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function Dashboard() {
  const products = useSelector(state => state.products.products);  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out animation
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentDashboard, setCurrentDashboard] = useState("products");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false); // State for create button menu
  
  // Pagination and sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Sorting by name or price
  
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
    }, 2000);  // Delay to match the fade-out duration (2 seconds)
  };

  // Filtering products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting the products
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className={`py-20 min-h-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
      {/* Title Section */}
      <div className="flex flex-col items-center mb-6 mt-12 phone:text-3xl">
        <h1 className="text-6xl font-semibold text-gray-950 text-center phone:text-3xl">
          {currentDashboard === 'products' ? 'Product Dashboard' : 'Category Dashboard'}
        </h1>
  
        {/* Search and Sorting Section */}
        <div className="flex space-x-4 mt-4">
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/4"
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 p-1 rounded text-sm"
            size="small"
          >
            <MenuItem value="name">Sort by Name</MenuItem>
            <MenuItem value="price">Sort by Price</MenuItem>
          </Select>
        </div>
  
        {/* Flex container for Select and Create button */}
        <div className="flex space-x-4 mt-4">
          <select
            value={currentDashboard}
            onChange={(e) => setCurrentDashboard(e.target.value)}
            className="bg-white border border-gray-300 p-1 rounded text-sm"
          >
            <option value="products">Product Dashboard</option>
            <option value="categories">Category Dashboard</option>
          </select>
  
          <div className="relative">
            <button
              onClick={toggleCreateMenu}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
            >
              Create {isCreateMenuOpen ? '▲' : '▼'}
            </button>
            {isCreateMenuOpen && (
              <div
                className="absolute top-full mt-1 left-0 bg-white shadow-md rounded w-full origin-top"
                style={{
                  transform: `scale(${isCreateMenuOpen ? 1 : 0})`,
                  opacity: isCreateMenuOpen ? 1 : 0,
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
              >
                <button
                  onClick={() => handleNavigateWithFadeOut('/productform')}
                  className="py-1 px-3 hover:bg-gray-100 text-gray-800 w-full text-left text-sm"
                >
                  Product
                </button>
                <button
                  onClick={() => handleNavigateWithFadeOut('/categoryform')}
                  className="py-1 px-3 hover:bg-gray-100 text-gray-800 w-full text-left text-sm"
                >
                  Category
                </button>
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
          <Dashboard2 />
        </>
      )}
    </div>
  );
}

export default Dashboard;
