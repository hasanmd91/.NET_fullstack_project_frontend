import React, { useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getAUserAsync, updateUserAsync } from '../../redux/thunks/userThunk';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { registerUser } from '../../types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../validation/userValidation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';

const UserDetails = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getAUserAsync(id));
  }, [dispatch, id]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUser>({
    resolver: yupResolver(userSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const ref = null;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandeler: SubmitHandler<registerUser> = (data: registerUser) => {
    if (currentUser?.id) {
      const { id } = currentUser;
      dispatch(updateUserAsync({ data, id }));
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{ width: '100%', padding: '20px', marginTop: '15px' }}
      >
        <Box display="flex" gap={'15px'}>
          <Avatar alt="avatar" src={currentUser?.avatar} />
          <Typography variant="h6" gutterBottom fontWeight={'bold'}>
            {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit(submitHandeler)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue={currentUser.firstName}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.firstName?.message}
                error={errors.firstName ? true : false}
                label="Firstname"
                ref={ref}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue={currentUser.lastName}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.lastName?.message}
                error={errors.lastName ? true : false}
                label="Lastname"
                ref={ref}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={currentUser.email}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.email?.message}
                error={errors.email ? true : false}
                label="Email"
                ref={ref}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={currentUser.password}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                helperText={errors.password?.message}
                error={errors.password ? true : false}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      >
                        <IconButton edge="end">
                          {showPassword ? (
                            <React.Fragment>
                              <VisibilityIcon />
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <VisibilityOffIcon />
                            </React.Fragment>
                          )}
                        </IconButton>
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="avatar"
            control={control}
            defaultValue={currentUser.avatar}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.avatar?.message}
                error={errors.avatar ? true : false}
                label="Avatar"
                ref={ref}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            defaultValue={currentUser.address}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.address?.message}
                error={errors.address ? true : false}
                label="Address"
                ref={ref}
              />
            )}
          />

          <Controller
            name="zip"
            control={control}
            defaultValue={currentUser.zip}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.zip?.message}
                error={errors.zip ? true : false}
                label="Zip Code"
                ref={ref}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            defaultValue={currentUser.city}
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.city?.message}
                error={errors.city ? true : false}
                label="City"
                ref={ref}
              />
            )}
          />

          <Box display={'flex'}>
            <Button type="submit" sx={{ marginRight: '1rem' }}>
              Update
            </Button>
            <Button type="reset" onClick={() => reset()}>
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UserDetails;
