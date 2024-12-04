import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { setProducts } from '../Store/Slices/productSlice'; 
import '../App.css'; 

const Dashboard = () => {
  const products = useSelector((state) => state.products.products);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState('products');
  const [productToDelete, setProductToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Etat pour la fenêtre modale de suppression
  const [snackbar, setSnackbar] = useState(null); // Etat pour le snack bar
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/product')
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => console.error('Error fetching products:', error));

    axios.get('http://localhost:8000/api/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error('Error fetching categories:', error))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleNavigateWithFadeOut = (targetPage) => {
    navigate(targetPage);
  };

  // Fonction pour ouvrir la fenêtre modale de suppression pour un produit
  const handleOpenDeleteDialog = (item, type) => {
    if (type === 'product') {
      setProductToDelete(item);
    } else if (type === 'category') {
      setCategoryToDelete(item);
    }
    setOpenDeleteDialog(true);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = async () => {
    try {
      if (productToDelete) {
        await axios.delete(`http://localhost:8000/api/product/${productToDelete.id}`);
        setSnackbar('Product deleted successfully!');
        dispatch(setProducts(products.filter(product => product.id !== productToDelete.id)));
      } else if (categoryToDelete) {
        await axios.delete(`http://localhost:8000/api/category/${categoryToDelete.id}`);
        setSnackbar('Category deleted successfully!');
        setCategories(categories.filter(category => category.id !== categoryToDelete.id));
      }
    } catch (error) {
      setSnackbar('Failed to delete. Please try again.');
    } finally {
      setOpenDeleteDialog(false);
      setProductToDelete(null);
      setCategoryToDelete(null);
    }
  };

  const closeSnackbar = () => {
    setSnackbar(null);
  };

  // Fonction de pagination
  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Table pour les produits avec pagination
  const ProductTable = () => {
    const paginatedProducts = paginate(products, currentPage, itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
      <div className="overflow-x-auto shadow-md rounded-lg mx-auto max-w-6xl mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Price</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Category</th>
              <th className="px-4 py-2 text-left font-semibold">Creation Date</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2 break-word">{product.description}</td>
                <td className="px-4 py-2">{product.category?.name || 'N/A'}</td>
                <td className="px-4 py-2">
                  {new Date(product.creation_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleNavigateWithFadeOut(`/productform/${product.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDeleteDialog(product, 'product')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // Table pour les catégories avec pagination
  const CategoryTable = () => {
    const paginatedCategories = paginate(categories, currentPage, itemsPerPage);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    return (
      <div className="overflow-x-auto shadow-md rounded-lg mx-auto max-w-6xl mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Category Name</th>
              <th className="px-4 py-2 text-left font-semibold">Number of Products</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category) => {
              const productCount = products.filter(
                (product) => product.category?.id === category.id
              ).length;

              return (
                <tr key={category.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">{productCount}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleNavigateWithFadeOut(`/categoryform/${category.id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenDeleteDialog(category, 'category')}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold">
          {currentDashboard === 'products' ? 'Product Dashboard' : 'Category Dashboard'}
        </h1>
        <select
          value={currentDashboard}
          onChange={(e) => setCurrentDashboard(e.target.value)}
          className="mt-4 bg-white border border-gray-300 p-2 rounded"
        >
          <option value="products">Product Dashboard</option>
          <option value="categories">Category Dashboard</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <>
          {currentDashboard === 'products' ? <ProductTable /> : <CategoryTable />}
        </>
      )}

      {/* Dialog de suppression */}
      {openDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this {productToDelete ? 'product' : 'category'}?</h2>
            <div className="flex space-x-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Confirm
              </button>
              <button onClick={() => setOpenDeleteDialog(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snack bar */}
      {snackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
          {snackbar}
          <button onClick={closeSnackbar} className="ml-4 text-white font-bold">X</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
