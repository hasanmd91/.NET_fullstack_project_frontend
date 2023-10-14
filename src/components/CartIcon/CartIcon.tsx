import * as React from 'react';
import { Link } from 'react-router-dom';
import Badge, { BadgeProps } from '@mui/material/Badge';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

type CartIconPropsType = {
  ItemCount: number;
};

const CartIcon: React.FC<CartIconPropsType> = ({ ItemCount }) => {
  return (
    <IconButton aria-label="cart">
      <Link to="/cart">
        <StyledBadge badgeContent={ItemCount} color="secondary">
          <ShoppingCartIcon style={{ color: 'blanchedalmond' }} />
        </StyledBadge>
      </Link>
    </IconButton>
  );
};

export default CartIcon;
