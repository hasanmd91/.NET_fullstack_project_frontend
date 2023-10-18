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

import brandvideo from '../assets/video.mp4';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { getAllProductsAsync } from '../redux/thunks/productThunk';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import MediaCard from '../components/Card/Card';
import { product } from '../types/product';

const Images = [
  'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://ohnatural.co.nz/wp-content/uploads/2023/09/Mobile-Spring-Sale-2023.gif',
];

const Home = () => {
  const { products, loading, error } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  if (loading) {
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
    <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <video
          src={brandvideo}
          autoPlay
          loop
          muted
          style={{ objectFit: 'cover', width: '100%' }}
        />
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        <Divider />
        <Typography variant="h5" gutterBottom>
          Featured Products
        </Typography>

        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          {products.length > 10 &&
            products.slice(0, 30).map((product: product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <MediaCard product={product} />
              </Link>
            ))}
        </Box>

        <ImageSlider images={Images} />

        <Divider />
      </Box>
    </Container>
  );
};

export default Home;
