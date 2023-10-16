import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type searchType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<searchType> = ({ search, setSearch }) => {
  const searchHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString().toLowerCase();
    setSearch(value);
  };

  return (
    <Paper
      component="form"
      sx={{
        border: '1px solid #8A8A8A',
        alignItems: 'center',
        display: 'flex',
        width: '60%',
        p: '2px 4px',
      }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        value={search}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'Search ' }}
        onChange={searchHandeler}
      />
    </Paper>
  );
};

export default SearchBar;
