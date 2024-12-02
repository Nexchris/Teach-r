import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '../src/Assets/AppBar/AppBar';
import IndexPage from '../src/Pages/IndexPage';
import ProductFormPage from './Pages/ProductForm.jsx';
import CategoryFormPage from './Pages/CategoryForm.jsx';
import DefaultPage from '../src/Pages/DefaultPage';
import DashboardPage from './Pages/Dashboard';
import { Provider } from 'react-redux'; // Import Redux Provider
import store from './Store/store.js'; // Import Redux Store

function App() {
  return (
    <Provider store={store}> {/* Fournit le store à toute l'application */}
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/productform" element={<ProductFormPage />} />
          <Route path="/categoryform" element={<CategoryFormPage />} />
          <Route path="/default" element={<DefaultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/categoryform/:id" element={<CategoryFormPage />} />
          <Route path="/productform/:productId?" element={<ProductFormPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
