import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importer les composants de react-router-dom
import AppBar from '../src/Assets/AppBar/AppBar';
import IndexPage from '../src/Pages/IndexPage';
import ProductFormPage from './Pages/ProductFormPage';
import CategoryFormPage from './Pages/CategoryFormPage';
import DefaultPage from '../src/Pages/DefaultPage';
import DashboardPage from './Pages/Dashboard';

function App() {
  return (
    <Router> {/* Enveloppe toute l'application avec le Router */}
      <AppBar />
      <Routes> {/* Utiliser Routes pour définir les routes */}
        <Route path="/" element={<IndexPage />} /> {/* Définir la route par défaut */}
        <Route path="/productform" element={<ProductFormPage />} /> {/* Ajouter d'autres routes si nécessaire */}
        <Route path="/categoryform" element={<CategoryFormPage />} /> {/* Ajouter d'autres routes si nécessaire */}
        <Route path="/default" element={<DefaultPage />} /> {/* Autre route exemple */}
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Autre route exemple */}


      </Routes>
    </Router>
  );
}

export default App;
