import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import CartItem from '../components/CartItem/CartItem';
import useAppSelector from '../hooks/useAppSelector';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { CartItem as CartItemType } from '../types/cart';
import useAppDispatch from '../hooks/useAppDispatch';
import { clearCart, totalCartPrice } from '../redux/reducers/cartReducer';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import CartCalculator from '../components/CartCalculator/CartCalculator';

const Cart = () => {
  const { cartItems, totalAmount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(totalCartPrice());
  }, [dispatch]);

  if (!cartItems.length) {
    return (
      <CenteredContainer>
        <Typography gutterBottom>YOUR BAG IS EMPTY!!</Typography>
        <ShoppingBagIcon style={{ fontSize: '5rem' }} />
      </CenteredContainer>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} marginTop={'2rem'}>
        <Grid item xs={12} md={8}>
          <Box mt={4}>
            {cartItems.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
            <Button
              size="small"
              sx={{ marginRight: '2px' }}
              onClick={() => dispatch(clearCart())}
            >
              Empty cart
            </Button>
            <Button size="small" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartCalculator totalAmount={totalAmount} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
