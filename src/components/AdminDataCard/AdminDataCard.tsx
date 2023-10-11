import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

import { product } from '../../types/product';
import useAppDispatch from '../../Hooks/useAppDispatch';
import { deleteProductAsync } from '../../redux/methods/productMethod';

type AdminDataCardType = {
  product: product;
};

const AdminDataCard: React.FC<AdminDataCardType> = ({ product }) => {
  const dispatch = useAppDispatch();

  const editHandeler = () => {};
  const deleteHandeler = (id: number) => {
    dispatch(deleteProductAsync(id));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={1}>
          <img
            src={product.images[0] || ''}
            alt="product"
            style={{ width: '100%', maxHeight: '50px', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item md={8}>
          <Typography>
            <strong>Title: </strong>
            {product.title} (Id: {product.id})
          </Typography>
          <Typography>
            <strong>Description</strong>:
            {product.description.slice(0, 60) + '.....'}
          </Typography>
          <Typography>
            <strong> Price:</strong>
            {product.price} <strong>Category:</strong>
            {product.category.name}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Button color="inherit" onClick={editHandeler} disabled>
            Edit
          </Button>
          <Button color="error" onClick={() => deleteHandeler(product.id)}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminDataCard;
