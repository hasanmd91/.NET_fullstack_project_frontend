import React, { useState } from 'react';
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

type CartCalculatorType = {
  totalAmount: number;
};

const CartCalculator: React.FC<CartCalculatorType> = ({ totalAmount }) => {
  const [deliveryCost, setDeliveryCost] = useState(8.5); // Initial delivery cost
  const [total, setTotal] = useState(totalAmount + deliveryCost); // Initial total

  const handleDeliveryChange = (event: any) => {
    const selectedValue = Number(event.target.value);
    setDeliveryCost(selectedValue);
    setTotal(totalAmount + selectedValue);
  };

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
          <MenuItem value={8.5}>Standard Pick Up Point ($ 8.50)</MenuItem>
          <MenuItem value={20}>Next Day Delivery $20</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6">Total: ${total}</Typography>
      <Button fullWidth>CHECKOUT</Button>

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
