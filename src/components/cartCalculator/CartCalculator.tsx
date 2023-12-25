import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import Button from '../Button/Button';
import useAppSelector from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { totalCartPrice } from '../../redux/reducers/cartReducer';

const CartCalculator = () => {
  const { totalAmount } = useAppSelector((state) => state.cart);

  const [deliveryCost, setDeliveryCost] = useState<number>(8.5);
  const { currentUser } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeliveryChange = (event: any) => {
    const selectedValue = Number(event.target.value);
    setDeliveryCost(selectedValue);
  };

  useEffect(() => {
    dispatch(totalCartPrice());
  }, [dispatch]);

  return (
    <Paper
      elevation={1}
      sx={{
        padding: '16px',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h3">
        <strong>Total</strong>
      </Typography>
      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Sub-Total</Typography>
        <Typography variant="h6">${totalAmount}</Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Delivery
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Select Delivery</InputLabel>
        <Select
          value={deliveryCost}
          onChange={handleDeliveryChange}
          label="Select Delivery"
        >
          <MenuItem value={8.5}>Standard Pick Up Point Free </MenuItem>
          <MenuItem value={20} disabled>
            Next Day Delivery{' '}
          </MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6">Total: ${totalAmount}</Typography>

      {currentUser?.role !== 'User' && (
        <Typography color="slateblue"> Login To checkout</Typography>
      )}
      <Button
        fullWidth
        disabled={currentUser?.role !== 'User' ? true : false}
        onClick={() => navigate('/checkout')}
      >
        CHECKOUT
      </Button>

      <Typography variant="h6" gutterBottom>
        WE ACCEPT:
      </Typography>
      <img src="/assets/card.png" alt="" style={{ width: '100%' }} />

      <Typography variant="caption" gutterBottom>
        Got a discount code? Add it in the next step.
      </Typography>
    </Paper>
  );
};

export default CartCalculator;
