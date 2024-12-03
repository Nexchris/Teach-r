import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Store/Slices/productSlice';
import Dashboard from './Dashboard';
import LoadingSpinner from '../Assets/Spinner/LoadingSpinner';
import StartPage from './StartPage';
import ErrorPage from './ErrorPage';

export default function Index() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentComponent, setCurrentComponent] = useState(<LoadingSpinner />);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let timeout;

    if (loading) {
      console.log('Chargement des données...');
      timeout = setTimeout(() => {
        setCurrentComponent(<LoadingSpinner />);
      }, 2000);
    } else if (error) {
      console.log('Il y a un problème avec la base de données ou le serveur :', error);
      timeout = setTimeout(() => {
        setCurrentComponent(<ErrorPage />);
      }, 2000);
    } else if (products.length > 0) {
      console.log('Vous êtes bien connecté à la base de données et l\'API fonctionne.');
      console.log('Produits trouvés :', products);
      timeout = setTimeout(() => {
        setCurrentComponent(<Dashboard />);
      }, 2000);
    } else {
      console.log('Vous êtes bien connecté à la base de données et l\'API fonctionne, mais il n\'y a aucun produit.');
      timeout = setTimeout(() => {
        setCurrentComponent(<StartPage />);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [loading, error, products]);

  return currentComponent;
}
