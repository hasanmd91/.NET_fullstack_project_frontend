import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

type QuantitySelectType = {
  changeQuantity: (quantity: number, id: number) => void;
  id: number;
};

const QuantitySelect: React.FC<QuantitySelectType> = ({
  changeQuantity,
  id,
}) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    const quantity = event.target.value as number;
    changeQuantity(quantity, id);
  };

  const quantityOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <FormControl>
      <Select onChange={handleChange} defaultValue={1}>
        {quantityOptions.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuantitySelect;
