import React, { useEffect } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
  deleteAUserAsync,
  getAllUsersAsync,
} from '../../redux/thunks/userThunk';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import { user } from '../../types/user';
import { string } from 'yup';

const UsersList = () => {
  const { users, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  const deleteHandler = (id: string) => {
    dispatch(deleteAUserAsync(id));
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
        <Alert severity="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return (
    <Container>
      <List>
        {users?.map((user: user) => (
          <Paper sx={{ margin: '1rem 0', padding: '15px' }} key={user.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.email} | ${user.role}`}
                  />
                  <ListItemText
                    primary={`${user.address}`}
                    secondary={`${user.zip} | ${user.city}`}
                  />
                  <ListItemText
                    primary={`Order Placed : ${user.orders?.length}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box textAlign="right">
                    <Button
                      sx={{ color: 'red' }}
                      onClick={() => deleteHandler(user.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default UsersList;
