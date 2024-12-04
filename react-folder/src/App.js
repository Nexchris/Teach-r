import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '../src/Assets/AppBar/AppBar';
import Index from './pages/IndexPage.jsx';
import ProductForm from './pages/ProductForm.jsx';
import CategoryForm from './pages/CategoryForm.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js'; 
import Footer from './Assets/Footer/footer.jsx';
import Background from './pages/Background.jsx';

function App() {
  return (
    <Provider store={store}> {}
      <Router>
        <AppBar />
        <Background/>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productform" element={<ProductForm />} />
          <Route path="/categoryform" element={<CategoryForm />} />
          <Route path="/background" element={<Background />} />
          <Route path="/categoryform/:id" element={<CategoryForm />} />
          <Route path="/productform/:productId?" element={<ProductForm />} />
        </Routes>
        <Footer/>
      </Router>
    </Provider>
  );
}

export default App;
