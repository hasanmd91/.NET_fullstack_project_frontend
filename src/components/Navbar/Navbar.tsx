import * as React from 'react';
import { AppBar, Button, Container, Toolbar } from '@mui/material';

import useAppSelector from '../../hooks/useAppSelector';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import NavigationBar from './NavigationBar/NavigationBar';
import TooltipMenu from './TooltipMenu/TooltipMenu';
import Link from '../Link/Link';
import CartIcon from '../CartIcon/CartIcon';
import Logo from '../Logo/Logo';
import { shades } from '../../Theme';

const Navbar = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <AppBar position="static" sx={{ background: shades.primary[500] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <HamburgerMenu />
          <NavigationBar />

          {currentUser ? (
            <TooltipMenu />
          ) : (
            <Link to="/login">
              <Button
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  margin: 'auto',
                  padding: '5px 10px',
                  border: '1px solid #d93226',
                }}
              >
                LOGIN
              </Button>
            </Link>
          )}

          <CartIcon ItemCount={cartItems.length} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
