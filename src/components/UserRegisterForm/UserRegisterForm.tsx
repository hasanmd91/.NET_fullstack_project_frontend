import React, { useState } from 'react';
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import TextField from '../TextField/TextField';
import { registerUser } from '../../types/user';
import useAppSelector from '../../hooks/useAppSelector';
import Button from '../Button/Button';

type UserRegisterFormType = {
  handleSubmit: UseFormHandleSubmit<registerUser>;
  submitHandeler: SubmitHandler<registerUser>;
  reset: UseFormReset<registerUser>;
  control: Control<registerUser>;
  errors: FieldErrors<registerUser>;
};

const UserRegisterForm: React.FC<UserRegisterFormType> = ({
  handleSubmit,
  submitHandeler,
  control,
  errors,
  reset,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { error } = useAppSelector((state) => state.user);
  const ref = null;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: '90%',
          maxWidth: '900px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0',
        }}
      >
        <Typography variant="h5"> Register</Typography>

        <form onSubmit={handleSubmit(submitHandeler)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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

          <Button type="submit" sx={{ marginRight: '1rem' }}>
            Submit
          </Button>
          <Button type="reset" onClick={() => reset()}>
            Reset
          </Button>
        </form>
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default UserRegisterForm;
