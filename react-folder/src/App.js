import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '../src/Assets/AppBar/AppBar';
import Index from './pages/IndexPage.jsx';
import ProductFormPage from './pages/ProductForm.jsx';
import CategoryFormPage from './pages/CategoryForm.jsx';
import DefaultPage from './pages/DefaultPage.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import LoadingPage from './Assets/Spinner/LoadingSpinner.jsx';
import StartPage from './pages/StartPage.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js'; 
import Footer from './Assets/Footer/footer.jsx';
import Background from './pages/Background.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

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
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/p" element={<StartPage />} />
          <Route path="/loading" element={<LoadingPage />} />
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
