import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CEButton from '../Assets/Button/CreButton'
import { useSelector, useDispatch } from 'react-redux'; 

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { setCategories, addProduct, updateProduct, deleteProduct } from '../Store/Slices/productSlice'; 
import Background from '../background/arraybackground'

function FormulaireProduit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(state => state.products.categories);
  const produitEnEdition = useSelector(state => state.products.products.find(produit => produit.id === parseInt(productId)));

  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [chargement, setChargement] = useState(false);
  const [messageSucces, setMessageSucces] = useState('');
  const [messageErreur, setMessageErreur] = useState('');
  const [estEnTrainDeDisparaitre, setEstEnTrainDeDisparaitre] = useState(false);
  const [confirmerSuppression, setConfirmerSuppression] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      axios
        .get('http://localhost:8000/api/category')
        .then((response) => {
          dispatch(setCategories(response.data));
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des catégories :", error);
        });
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (produitEnEdition) {
      setNom(produitEnEdition.name);
      setPrix(produitEnEdition.price);
      setDescription(produitEnEdition.description);
      setCategorie(produitEnEdition.category?.id || '');
    }
  }, [produitEnEdition]);

  const gererSoumission = async (e) => {
    e.preventDefault();
    setChargement(true);
    setMessageSucces('');
    setMessageErreur('');

    const donnees = {
      name: nom,
      price: prix,
      description,
      category: categorie,
    };

    try {
      let reponse;
      if (produitEnEdition) {
        reponse = await axios.put(`http://localhost:8000/api/product/${produitEnEdition.id}`, donnees);
        if (reponse.status === 200) {
          dispatch(updateProduct(reponse.data));
        }
      } else {
        reponse = await axios.post('http://localhost:8000/api/product', donnees);
        if (reponse.status === 201) {
          dispatch(addProduct(reponse.data));
        }
      }

      if (reponse.status === 200 || reponse.status === 201) {
        setMessageSucces(produitEnEdition ? "Produit mis à jour avec succès !" : "Produit créé avec succès !");
        setNom('');
        setPrix('');
        setDescription('');
        setCategorie('');
        setEstEnTrainDeDisparaitre(false);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setMessageErreur(produitEnEdition ? "Échec de la mise à jour du produit." : "Échec de la création du produit.");
    } finally {
      setChargement(false);
    }
  };

  const gererSuppression = async () => {
    try {
      const reponse = await axios.delete(`http://localhost:8000/api/product/${produitEnEdition.id}`);
      if (reponse.status === 200) {
        dispatch(deleteProduct(produitEnEdition.id));
        setMessageSucces("Produit supprimé avec succès !");
        setEstEnTrainDeDisparaitre(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setMessageErreur("Échec de la suppression du produit.");
    } finally {
      setConfirmerSuppression(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.7,
          backgroundColor: 'black',
          zIndex: -2,
        }}
      >
        <Background />
      </Box>

      <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>

      <Box>
        <div className={`min-h-screen p-8 ${estEnTrainDeDisparaitre ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              marginTop: '5rem',
            }}
          >
            <h1 className="text-2xl font-bold mb-6 text-center">
              {produitEnEdition ? "Modifier le produit" : "Créer un produit"}
            </h1>
            <form onSubmit={gererSoumission}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Nom"
                    disabled={chargement}
                    variant="outlined"
                    fullWidth
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    sx={{
                      '& .MuiFormLabel-root': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Prix"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    required
                    sx={{
                      '& .MuiFormLabel-root': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    sx={{
                      '& .MuiFormLabel-root': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      label="Catégorie"
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <CEButton />
                </Grid>

                {produitEnEdition && (
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setConfirmerSuppression(true)}
                      sx={{
                        background: 'linear-gradient(to right, #ff724f 0%, #ffb6a3 100%)',
                        color: 'white',
                        transition: 'transform 0.3s ease, background 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(to right, #ff724f 0%, red 100%)',
                          transform: 'scale(1.3)',
                        },
                        borderRadius: '20px',
                        fontFamily: 'Nunito, sans-serif',
                        fontWeight: '900',
                      }}
                    >
                      Supprimer le produit
                    </Button>
                  </Grid>
                )}

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/')}
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      transition: 'transform 0.3s ease, background 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.3)',
                      },
                      borderRadius: '20px',
                      fontFamily: '"Nunito", sans-serif',
                      fontWeight: '900',
                    }}
                  >
                    Retour à l'accueil
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>

          {messageSucces && (
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setMessageSucces('')}>
              <Alert onClose={() => setMessageSucces('')} severity="success">
                {messageSucces}
              </Alert>
            </Snackbar>
          )}
          {messageErreur && (
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setMessageErreur('')}>
              <Alert onClose={() => setMessageErreur('')} severity="error">
                {messageErreur}
              </Alert>
            </Snackbar>
          )}

          <Dialog open={confirmerSuppression} onClose={() => setConfirmerSuppression(false)}>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogContent>
              <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmerSuppression(false)} color="primary">
                Annuler
              </Button>
              <Button onClick={gererSuppression} color="secondary">
                Oui, supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
}

export default FormulaireProduit;
