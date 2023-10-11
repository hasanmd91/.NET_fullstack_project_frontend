import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { PriceSortOption } from '../../../types/price';
import useAppDispatch from '../../../Hooks/useAppDispatch';
import { sortProduct } from '../../../redux/reducers/productReducer';

const priceSortOptions = [
  { label: 'High to Low', value: PriceSortOption.HIGH_TO_LOW },
  { label: 'Low to High', value: PriceSortOption.LOW_TO_HIGH },
];

const FilterByprice = () => {
  const dispatch = useAppDispatch();

  const categoryHandeler = (event: SelectChangeEvent<string>) => {
    const actionType = event.target.value;

    if (actionType) {
      dispatch(sortProduct(actionType));
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Filter By Price</InputLabel>
      <Select variant="standard" onChange={categoryHandeler} defaultValue="">
        {priceSortOptions.map((price) => (
          <MenuItem key={price.value} value={price.value}>
            {price.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByprice;
