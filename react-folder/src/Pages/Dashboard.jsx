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
    <div className={`py-20 min-h-screen ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
      {/* Title Section */}
      <div className="flex flex-col items-center mb-6 mt-12   phone:text-3xl">
        <h1 className="text-6xl font-semibold text-gray-950 text-center  phone:text-3xl">
          {currentDashboard === 'products' ? 'Product Dashboard' : 'Category Dashboard'}
        </h1>
  
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
          <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-t-4 border-blue-600 rounded-full"></div>
        </div>
      ) : (
        <>
          {/* Table Section */}
          <div className="overflow-x-auto shadow-lg rounded-lg mx-auto max-w-6xl mt-6">
            <table className="min-w-full table-auto table-fixed">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/4">Name</th>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/6">Price</th>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/4">Description</th>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/5">Category</th>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/6">Creation Date</th>
                  <th className="py-1 px-2 text-left font-semibold text-sm w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDashboard === 'products' && products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-1 px-2 text-sm">{product.name}</td>
                    <td className="py-1 px-2 text-sm">{product.price}</td>
                    <td className="py-1 px-2 text-sm">{product.description}</td>
                    <td className="py-1 px-2 text-sm">{product.category?.name || 'N/A'}</td>
                    <td className="py-1 px-2 text-sm">{new Date(product.creation_date).toLocaleDateString()}</td>
                    <td className="py-1 px-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNavigateWithFadeOut(`/productform/${product.id}`)}
                          className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteDialog(product)}
                          className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentDashboard === 'categories' && categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-1 px-2 text-sm">{category.name}</td>
                    <td className="py-1 px-2 text-sm">{category.products?.length || 0}</td>
                    <td className="py-1 px-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNavigateWithFadeOut(`/categoryform/${category.id}`)}
                          className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteDialog(category)}
                          className="py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
  

}  

export default Dashboard;
