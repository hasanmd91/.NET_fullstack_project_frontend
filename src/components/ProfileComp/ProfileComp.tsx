import React, { ReactElement, forwardRef } from 'react';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { user } from '../../types/user';
import TextField from '../../components/TextField/TextField';
import useAppSelector from '../../hooks/useAppSelector';
import Button from '../Button/Button';

type ProfileCompType = {
  handleSubmit: UseFormHandleSubmit<Partial<user>>;
  submitHandeler: SubmitHandler<Partial<user>>;
  reset: UseFormReset<Partial<user>>;
  control: Control<Partial<user>>;
  errors: FieldErrors<Partial<user>>;
};

const ProfileComp: React.FC<ProfileCompType> = forwardRef(
  (
    { handleSubmit, submitHandeler, control, errors, reset },
    ref
  ): ReactElement => {
    const { currentUser } = useAppSelector((state) => state.user);

    return (
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ marginTop: '5rem', padding: '1rem' }}>
          <Box display="flex" gap={'15px'}>
            <Avatar alt="avatar" src={currentUser?.avatar} />
            <Typography variant="h6" gutterBottom fontWeight={'bold'}>
              {currentUser?.name}
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
              name="name"
              control={control}
              defaultValue={currentUser?.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  helperText={errors.name?.message}
                  error={errors.name ? true : false}
                  label={'Name'}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue={currentUser?.email}
              render={({ field }) => (
                <TextField
                  {...field}
                  helperText={errors.name?.message}
                  error={errors.name ? true : false}
                  label={'Email'}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue={currentUser?.password}
              render={({ field }) => (
                <TextField
                  {...field}
                  helperText={errors.name?.message}
                  error={errors.name ? true : false}
                  label={'password'}
                />
              )}
            />
            <Controller
              name="avatar"
              control={control}
              defaultValue={currentUser?.avatar}
              render={({ field }) => (
                <TextField
                  {...field}
                  helperText={errors.name?.message}
                  error={errors.name ? true : false}
                  label={'Avatar'}
                />
              )}
            />

            <TextField
              disabled
              defaultValue={''}
              label={`User ID :${currentUser?.id}`}
            />
            <TextField
              disabled
              defaultValue={''}
              label={`Role :${currentUser?.role}`}
            />

            <Box>
              <Button sx={{ marginRight: '3px' }}>Edit</Button>
              <Button type="reset" onClick={() => reset()}>
                Reset
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    );
  }
);
export default ProfileComp;
