import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import CartItem from '../components/CartItem/CartItem';
import useAppSelector from '../Hooks/useAppSelector';
import CartCalculator from '../components/cartCalculator/CartCalculator';

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} marginTop={'2rem'}>
        <Grid item xs={12} md={8}>
          <Box mt={4}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartCalculator />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
