import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import CartItem from '../components/CartItem/CartItem';
import useAppSelector from '../Hooks/useAppSelector';

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>
    </Container>
  );
};

export default Cart;
