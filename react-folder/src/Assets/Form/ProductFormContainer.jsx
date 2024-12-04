import React from 'react';
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ProductFormContainer({ formState, setFormState, categories, onSubmit, loading, onCancel, onDelete, isEdit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="form-container">
      <h1>{isEdit ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formState);
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              name="price"
              value={formState.price}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formState.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
            {isEdit && <Button onClick={onDelete} color="secondary">Delete</Button>}
            <Button onClick={onCancel} color="default">Cancel</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ProductFormContainer;
