import React from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as cartItem } from '../../types/cart';
import useAppDispatch from '../../hooks/useAppDispatch';
import QuantitySelect from '../InputSelect/InputSelect';
import {
  setItemQuantity,
  removeItemFromCart,
  totalCartPrice,
} from '../../redux/reducers/cartReducer';

type CartItemType = {
  item: cartItem;
};

const CartItem: React.FC<CartItemType> = ({ item }) => {
  const dispatch = useAppDispatch();

  const removeItem = (id: number) => {
    dispatch(removeItemFromCart(id));
    dispatch(totalCartPrice());
  };

  const changeQuantity = (quantity: number, id: number) => {
    dispatch(setItemQuantity({ quantity, id }));
    dispatch(totalCartPrice());
  };

  return (
    <Paper elevation={1} style={{ padding: '5px', marginBottom: '6px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box flexGrow={1} margin={'auto'}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              maxWidth: '100%',
              maxHeight: '70px',
              height: 'auto',
              borderRadius: '4px',
            }}
          />
        </Box>

        <Box flexGrow={2}>
          <Typography variant="body1" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ${item.price}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            gutterBottom
            fontWeight={'bold'}
          >
            Quantity {item.quantity}x
          </Typography>
          <Button onClick={() => removeItem(item.id)}>
            <DeleteIcon style={{ color: 'gray' }} />
          </Button>
          <Typography
            variant="caption"
            color="textSecondary"
            gutterBottom
            fontWeight={'bold'}
          >
            Total ${item.totalPrice}
          </Typography>
        </Box>

        <Box flexGrow={1}>
          <QuantitySelect changeQuantity={changeQuantity} id={item.id} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItem;
