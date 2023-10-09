import React, { useEffect } from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import useAppDispatch from '../Hooks/useAppDispatch';
import {
  getAllProductsAsync,
  deleteProductAsync,
} from '../redux/methods/productMethod';
import Form from './Form';
import { sortProduct } from '../redux/reducers/productReducer';
import useButtonWithDelay from '../Hooks/useButtonWithDelay';
import MediaCard from '../components/card/Card';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  circularProgressClasses,
} from '@mui/material';
import { error } from 'console';
import CenteredContainer from '../components/CenterContainer/CenterContainer';

const ProductList = () => {
  const { products, status, error } = useAppSelector((state) => state.product);

  const [isDisabled, disabledButtonForASecond] = useButtonWithDelay();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const handleDelete = (productId: number) => {
    dispatch(deleteProductAsync(productId));
    disabledButtonForASecond();
  };

  const sort = () => {
    dispatch(sortProduct('Z-A'));
  };

  if (status === 'loading') {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Alert security="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return products.length > 0 ? (
    <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>
      <Box
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {products.map((product) => (
          <MediaCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  ) : null;
};

export default ProductList;
