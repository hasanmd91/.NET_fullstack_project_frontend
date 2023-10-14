import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { nameSortOption } from '../../../types/nameFilter';
import { sortProduct } from '../../../redux/reducers/productReducer';

const nameSortOptions = [
  { label: 'A-Z', value: nameSortOption.AtoZ },
  { label: 'Z-A', value: nameSortOption.ZtoA },
];

const FilterByName: React.FC = () => {
  const dispatch = useAppDispatch();

  const categoryHandeler = (event: SelectChangeEvent<string>) => {
    const actionType = event.target.value;
    dispatch(sortProduct(actionType));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Filter By Name</InputLabel>
      <Select variant="standard" onChange={categoryHandeler} defaultValue="">
        {nameSortOptions.map((name) => (
          <MenuItem key={name.value} value={name.value}>
            {name.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByName;
