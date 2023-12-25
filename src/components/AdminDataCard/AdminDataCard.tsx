import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { product } from '../../types/product';
import useAppDispatch from '../../hooks/useAppDispatch';
import { deleteProductAsync } from '../../redux/thunks/productThunk';
import useButtonWithDelay from '../../hooks/useButtonWithDelay';
import { Link } from 'react-router-dom';

type AdminDataCardType = {
  product: product;
};

const AdminDataCard: React.FC<AdminDataCardType> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isDisabled, disabledButtonForASecond] = useButtonWithDelay();

  const deleteHandeler = (id: string) => {
    dispatch(deleteProductAsync(id));
    disabledButtonForASecond();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        marginBottom: '1rem',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={1}>
          <img
            src={product.images[0].imageUrl || ''}
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
          <Button
            color="error"
            onClick={() => deleteHandeler(product.id)}
            disabled={isDisabled}
          >
            Delete
          </Button>

          <Link to={`update/${product.id}`}>
            <Button>Edit</Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdminDataCard;
