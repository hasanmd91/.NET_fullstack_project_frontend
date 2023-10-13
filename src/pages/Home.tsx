import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from '@mui/material';

import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { getAllProductsAsync } from '../redux/methods/productMethod';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import useAppDispatch from '../Hooks/useAppDispatch';
import useAppSelector from '../Hooks/useAppSelector';
import MediaCard from '../components/card/Card';
import { product } from '../types/product';

const Images = [
  'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://ohnatural.co.nz/wp-content/uploads/2023/09/Mobile-Spring-Sale-2023.gif',
];

const Home = () => {
  const { products, status, error } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

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

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <ImageSlider images={Images} />

      <Box sx={{ marginTop: '2rem' }}>
        <Divider />
        <Typography variant="h5" gutterBottom>
          Featured Products
        </Typography>
        {products.length > 10 &&
          products.slice(0, 8).map((product: product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <MediaCard product={product} />
            </Link>
          ))}
      </Box>
    </Container>
  );
};

export default Home;
