import React from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as cartItem } from '../../types/cart';
import useAppDispatch from '../../Hooks/useAppDispatch';
import {
  setItemQuantity,
  removeItemFromCart,
} from '../../redux/reducers/cartReducer';
import QuantitySelect from '../InputSelect/InputSelect';

type CartItemType = {
  item: cartItem;
};

const CartItem: React.FC<CartItemType> = ({ item }) => {
  const dispatch = useAppDispatch();

  const removeItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const changeQuantity = (quantity: number, id: number) => {
    dispatch(setItemQuantity({ quantity, id }));
  };

  return (
    <Paper elevation={1} style={{ padding: '10px', marginBottom: '6px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <img
            src={item.image}
            alt={item.title}
            style={{ maxWidth: '100%', maxHeight: '100px' }}
          />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            ${item.price}
          </Typography>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            Quantity {item.quantity}x
          </Typography>
          <Button onClick={() => removeItem(item.id)}>
            <DeleteIcon style={{ color: 'gray' }} />
          </Button>
        </Box>

        <Box>
          <QuantitySelect changeQuantity={changeQuantity} id={item.id} />
        </Box>
      </Box>
    </Paper>
  );
};

export default CartItem;
