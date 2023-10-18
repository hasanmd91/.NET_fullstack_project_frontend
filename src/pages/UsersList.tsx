import React, { useEffect, useState } from 'react';
import { getAllUsersAsync, updateUserAsync } from '../redux/thunks/userThunk';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { user } from '../types/user';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userEditschema } from '../validation/userEditschema';

const UsersList = () => {
  const { users, loading, error } = useAppSelector((state) => state.user);
  const [editUser, setEditUser] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<user>>({
    resolver: yupResolver(userEditschema),
  });

  const onSubmit = (data: Partial<user>) => {
    console.log(data);

    if ('id' in data && typeof data.id === 'number') {
      dispatch(updateUserAsync({ data: data, id: data.id }));
    }
  };

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
              <Button disabled> Edit</Button>
              <Button disabled> Delete</Button>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Container>
  );
};

export default UsersList;
