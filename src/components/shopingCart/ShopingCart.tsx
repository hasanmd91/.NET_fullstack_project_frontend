import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const ShopingCart = () => {
  return (
    <Link to="/cart">
      <ShoppingCartIcon
        sx={{
          color: '#b24900',
          padding: '5px',
          border: '1px solid #b24900',
          borderRadius: '50%',
        }}
      />
    </Link>
  );
};

export default ShopingCart;
