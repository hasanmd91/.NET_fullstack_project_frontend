import React, { useEffect } from 'react';
import { getAllUsersAsync } from '../redux/thunks/userThunk';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { user } from '../types/user';

const UsersList = () => {
  const { users, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Alert security="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return (
    <Container>
      {users.map((user: user) => (
        <Paper sx={{ margin: '1rem 0', padding: '15px' }} key={user.id}>
          <Stack
            gap={3}
            direction={{ md: 'row', xs: 'column' }}
            justifyContent={'space-around'}
          >
            <Box>
              <Typography>
                Id : <strong>{user.id}</strong>
              </Typography>
            </Box>

            <Box display={'flex'} alignItems={'center'} gap={3}>
              <Avatar src={user.avatar} />

              <Typography>{user.name}</Typography>
            </Box>

            <Box display={'flex'}>
              <Typography>{user.email}</Typography>

              <Typography>{user.role}</Typography>
            </Box>
            <Box>
              <Button> Edit</Button>
              <Button sx={{ color: 'orange' }}> Delete</Button>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Container>
  );
};

export default UsersList;
