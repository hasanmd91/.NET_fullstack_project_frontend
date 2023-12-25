import React, { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import MainCarousel from '../components/MainCarousel/MainCarousel';
import Subscribe from '../components/Subscribe/Subscribe';
import { Box, CircularProgress, Typography } from '@mui/material';
import MediaCard from '../components/Card/Card';
import { Link } from 'react-router-dom';
import { product } from '../types/product';
import useAppDispatch from '../hooks/useAppDispatch';
import { getAllProductsAsync } from '../redux/thunks/productThunk';
import CenteredContainer from '../components/CenterContainer/CenterContainer';

const Home = () => {
  const { products, loading } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  return (
    <Box>
      <MainCarousel />

      <Box mt="50px" width="100%">
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box>
            <Typography variant="h2" fontWeight="bold">
              New & Featured
            </Typography>
          </Box>

          {loading ? (
            <CenteredContainer>
              <CircularProgress color="error" size="5rem" />
            </CenteredContainer>
          ) : (
            <Box>
              {products.slice(0, 10).map((p: product) => (
                <Link to={`/products/${p.id}`} key={p.id}>
                  <MediaCard product={p} />
                </Link>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Subscribe />
    </Box>
  );
};

export default Home;
