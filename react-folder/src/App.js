import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '../src/Assets/AppBar/AppBar';
import Index from './Pages/IndexPage.jsx';
import ProductFormPage from './Pages/ProductForm.jsx';
import CategoryFormPage from './Pages/CategoryForm.jsx';
import DefaultPage from '../src/Pages/DefaultPage';
import DashboardPage from './Pages/Dashboard';
import { Provider } from 'react-redux';
import store from './Store/store.js'; 
import Footer from './Assets/Footer/footer.jsx';
import Background from '../src/Pages/Background.jsx'

function App() {
  return (
    <Provider store={store}> {}
      <Router>
        <AppBar />
        <Background/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productform" element={<ProductFormPage />} />
          <Route path="/categoryform" element={<CategoryFormPage />} />
          <Route path="/default" element={<DefaultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/b" element={<Background />} />
          <Route path="/categoryform/:id" element={<CategoryFormPage />} />
          <Route path="/productform/:productId?" element={<ProductFormPage />} />
        </Routes>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;
