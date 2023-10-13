import { Box } from '@mui/material';
import React from 'react';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import FilterByprice from './FilterByprice/FilterByprice';
import FilterByName from './FilterByName/FilterByName';

const FilterBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      <CategoryFilter />
      <FilterByprice />
      <FilterByName />
    </Box>
  );
};

export default FilterBar;
