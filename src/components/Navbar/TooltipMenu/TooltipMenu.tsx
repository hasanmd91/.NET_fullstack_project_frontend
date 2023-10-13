import React from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import Link from '../../Link/Link';
import useAppSelector from '../../../Hooks/useAppSelector';
import { userRole } from '../../../types/user';
import useAppDispatch from '../../../Hooks/useAppDispatch';
import { logOut } from '../../../redux/reducers/authReducer';

const TooltipMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logouthandeler = () => {
    dispatch(logOut());
  };

  return (
    <Box sx={{ flexGrow: 0, marginRight: '10px' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src={currentUser?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {currentUser?.role === userRole.customer && (
          <Link to="/profile">
            <MenuItem>My Profile</MenuItem>
          </Link>
        )}
        {currentUser?.role === userRole.admin && (
          <Link to="/admidashbord">
            <MenuItem>Admin DashBoard</MenuItem>
          </Link>
        )}

        <MenuItem onClick={logouthandeler}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default TooltipMenu;
