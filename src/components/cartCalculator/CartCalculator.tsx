import React, { useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Button from '../Button/Button';

type CartCalculatorType = {
  totalAmount: number;
};

const CartCalculator: React.FC<CartCalculatorType> = ({ totalAmount }) => {
  const [deliveryCost, setDeliveryCost] = useState<number>(4);

  const changeHandeler = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value);

    setDeliveryCost(value);
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
      <Typography variant="body1">Total</Typography>
      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1">${totalAmount} </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">DeliverCost</Typography>
        <Typography variant="body1">${deliveryCost} </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1">
          ${`${totalAmount + deliveryCost}`}
        </Typography>
      </Box>

      <Typography variant="body1" gutterBottom>
        Delivery
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Standard Pick Up Point ($ 4)</InputLabel>
        <Select
          label="Standard Pick Up Point ($ 4)"
          value={deliveryCost}
          onChange={changeHandeler}
        >
          <MenuItem value={4}>Standard Pick Up Point ($ 4)</MenuItem>
          <MenuItem value={15}>Next Day Delivery $20</MenuItem>
        </Select>
      </FormControl>

      <Button fullWidth>CHECKOUT</Button>

      <Typography variant="body1" gutterBottom>
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
