import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { setProducts } from '../Store/Slices/productSlice'; 
import '../App.css'; 
import EditButton from '../Assets/Button/Dashboard/EditButton';
import DeleteButton from '../Assets/Button/Dashboard/DeleteButton'
import CancelButton from '../Assets/Button/Dashboard/CancelButton';
import CreateProductButton from '../Assets/Button/Dashboard/ProductButton';
import ConfirmButton from '../Assets/Button/Dashboard/ConfirmButton';
import CreateCategoryButton from '../Assets/Button/Dashboard/CategoryButton';

const Dashboard = () => {
  const products = useSelector((state) => state.products.products);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState('products');
  const [productToDelete, setProductToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

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

  // Fonction pour confirmer la suppression avec la vérification des produits
  const confirmDelete = async () => {
    try {
      if (productToDelete) {
        await axios.delete(`http://localhost:8000/api/product/${productToDelete.id}`);
        setSnackbar('Product deleted successfully!');
        dispatch(setProducts(products.filter(product => product.id !== productToDelete.id)));
      } else if (categoryToDelete) {
        // Vérifier si la catégorie contient des produits
        const productCount = products.filter(
          (product) => product.category?.id === categoryToDelete.id
        ).length;

        if (productCount > 0) {
          setSnackbar('Cannot delete this category because it has associated products.');
          return;
        }

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

  // Table pour les produits sans pagination
  const ProductTable = () => {
    return (
      <div className="overflow-x-auto shadow-md rounded-lg mx-auto max-w-6xl mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Nom</th>
              <th className="px-4 py-2 text-left font-semibold">Prix</th>
              <th className="px-4 py-2 text-left font-semibold">Description</th>
              <th className="px-4 py-2 text-left font-semibold">Catégorie</th>
              <th className="px-4 py-2 text-left font-semibold">Date de création</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
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
                    <EditButton onClick={() => handleNavigateWithFadeOut(`/productform/${product.id}`)} />
                    <DeleteButton onClick={() => handleOpenDeleteDialog(product, 'product')} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  const CategoryTable = () => {
    return (
      <div className="overflow-x-auto shadow-md rounded-lg mx-auto max-w-6xl mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Nom de la catégorie</th>
              <th className="px-4 py-2 text-left font-semibold">Nombre de produits</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const productCount = products.filter(
                (product) => product.category?.id === category.id
              ).length;
  
              return (
                <tr key={category.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">{productCount}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <EditButton onClick={() => handleNavigateWithFadeOut(`/categoryform/${category.id}`)} />
                      <DeleteButton onClick={() => handleOpenDeleteDialog(category, 'category')} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="py-20 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-semibold">
          {currentDashboard === 'products' ? 'Tableau de bord des produits' : 'Tableau de bord des catégories'}
        </h1>
        <div className="flex justify-center space-x-4 mt-6">
          <CreateProductButton onClick={() => handleNavigateWithFadeOut('/productform')} />
          <CreateCategoryButton onClick={() => handleNavigateWithFadeOut('/categoryform')} />
        </div>
        <select
          value={currentDashboard}
          onChange={(e) => setCurrentDashboard(e.target.value)}
          className="mt-4 bg-white border border-gray-300 p-2 rounded"
        >
          <option value="products">Tableau de bord des produits</option>
          <option value="categories">Tableau de bord des catégories</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="loader">Chargement...</div>
        </div>
      ) : (
        <>
          {currentDashboard === 'products' ? <ProductTable /> : <CategoryTable />}
        </>
      )}
  
      {openDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce {productToDelete ? 'produit' : 'catégorie'} ?</h2>
            <div className="flex space-x-4">
              <ConfirmButton onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Confirmer
              </ConfirmButton>
              <CancelButton onClick={() => setOpenDeleteDialog(false)} >
                Annuler
              </CancelButton>
            </div>
          </div>
        </div>
      )}
  
      {snackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md">
          {snackbar}
          <button onClick={closeSnackbar} className="ml-4 text-white font-bold">X</button>
        </div>
      )}
    </div>
  );
  };
  

export default Dashboard;
