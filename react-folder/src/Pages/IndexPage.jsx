import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../Store/Slices/productSlice';
import Dashboard from './Dashboard';
import LoadingSpinner from '../Assets/Spinner/LoadingSpinner';
import StartPage from './StartPage';
import ErrorPage from './ErrorPage';
import { CSSTransition } from 'react-transition-group';
import '../styles/indexpage.css'

export default function Index() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentComponent, setCurrentComponent] = useState(<LoadingSpinner />);
  const [showComponent, setShowComponent] = useState(<LoadingSpinner />);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let timeout;

    if (loading) {
      console.log('Chargement des données...');
      timeout = setTimeout(() => {
        setShowComponent(<LoadingSpinner />);
      }, 2000);
    } else if (error) {
      timeout = setTimeout(() => {
        console.log('Il y a un problème avec la base de données ou le serveur :', error);
        setShowComponent(<ErrorPage />);
      }, 2000);
    } else if (products.length > 0) {
      timeout = setTimeout(() => {
        console.log('Vous êtes bien connecté à la base de données et l\'API fonctionne.');
        console.log('Produits trouvés :', products);
        setShowComponent(<Dashboard />);
      }, 2000);
    } else {
      timeout = setTimeout(() => {
        console.log('Vous êtes bien connecté à la base de données et l\'API fonctionne, mais il n\'y a aucun produit.');
        setShowComponent(<StartPage />);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [loading, error, products]);

  useEffect(() => {
    setCurrentComponent(showComponent);
  }, [showComponent]);

  return (
    <CSSTransition
      in={!!currentComponent}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div>
        {currentComponent}
      </div>
    </CSSTransition>
  );
}
