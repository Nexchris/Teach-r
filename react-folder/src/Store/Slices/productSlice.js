import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour récupérer les produits depuis l'API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8000/api/product');
  return response.data; // Renvoie les produits récupérés de l'API
});

// Action asynchrone pour récupérer les catégories depuis l'API
export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('http://localhost:8000/api/category');
  return response.data; // Renvoie les catégories récupérées de l'API
});

// État initial
const initialState = {
  products: [],
  categories: [],  // Ajout de l'état pour les catégories
  loading: false,
  error: null,
};

// Slice pour les produits et les catégories
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action pour définir une liste de produits
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    // Action pour définir une liste de catégories
    setCategories: (state, action) => {
      state.categories = action.payload;  // Met à jour les catégories dans l'état
    },

    // Action pour ajouter un produit
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // Action pour mettre à jour un produit
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Action pour supprimer un produit
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    // Gérer les états du fetchProducts (chargement, succès, erreur)
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Gérer les états du fetchCategories (chargement, succès, erreur)
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export des actions
export const { setProducts, setCategories, addProduct, updateProduct, deleteProduct } = productSlice.actions;

// Export du reducer pour l'utiliser dans le store
export default productSlice.reducer;
