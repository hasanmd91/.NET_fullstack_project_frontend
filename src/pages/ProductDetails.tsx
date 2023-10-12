import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams, useNavigate } from 'react-router-dom';

import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { getAProductsAsync } from '../redux/methods/productMethod';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { addItemToCart } from '../redux/reducers/cartReducer';
import useAppDispatch from '../Hooks/useAppDispatch';
import useAppSelector from '../Hooks/useAppSelector';

const ProductView = () => {
  const { product } = useAppSelector((state) => state.productReducer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const productId: number = parseInt(id);
      dispatch(getAProductsAsync(productId));
    }
  }, [dispatch, id]);

  const addTocart = () => {
    if (product !== undefined && product !== null) {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.images[0],
      };

      dispatch(addItemToCart(cartItem));
    }
  };

  if (product) {
    return (
      <Container maxWidth="lg">
        <CenteredContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <ImageSlider images={product.images} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h3" fontWeight={'bold'}>
                  {product?.title}
                </Typography>
                <Divider />
                <Typography variant="h5" fontWeight={'bold'} marginTop={'2rem'}>
                  Description:
                </Typography>
                <Typography variant="body1" marginBottom={'1rem'}>
                  {product.description}
                </Typography>
                <Typography variant="h5" fontWeight={'bold'} marginTop={'1rem'}>
                  Price:
                </Typography>
                <Typography variant="h6" color={'ActiveBorder'}>
                  ${product.price}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', marginTop: '2rem' }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    background: '#0d2134',
                    margin: '20px 0',
                    '&:hover': { background: '#d93226' },
                  }}
                  onClick={addTocart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    background: '#d93226 ',
                    margin: '20px 0',
                    '&:hover': { background: '#0d2134' },
                  }}
                  onClick={() => navigate(-1)}
                >
                  BACK TO PRODUCT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CenteredContainer>
      </Container>
    );
  }
  return null;
};

export default ProductView;
