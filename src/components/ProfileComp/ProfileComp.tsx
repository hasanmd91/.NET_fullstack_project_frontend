import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { updateUser } from '../../types/user';
import TextField from '../../components/TextField/TextField';
import useAppSelector from '../../Hooks/useAppSelector';

type ProfileCompType = {
  handleSubmit: UseFormHandleSubmit<updateUser>;
  submitHandeler: SubmitHandler<updateUser>;
  reset: UseFormReset<updateUser>;
  control: Control<updateUser>;
  errors: FieldErrors<updateUser>;
};

const ProfileComp: React.FC<ProfileCompType> = ({
  handleSubmit,
  submitHandeler,
  control,
  errors,
  reset,
}): ReactElement => {
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
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.name?.message}
                error={errors.name ? true : false}
                label={currentUser?.name}
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
                helperText={errors.name?.message}
                error={errors.name ? true : false}
                label={currentUser?.email}
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
          <TextField
            disabled
            defaultValue={''}
            label={`Password :${currentUser?.password}`}
          />
          <TextField
            disabled
            defaultValue={''}
            label={`Avatar :${currentUser?.avatar}`}
          />

          <Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{ marginTop: '16px' }}
              sx={{
                marginRight: '1rem',
                background: '#0d2134',
                '&:hover': { background: '#d93226' },
              }}
            >
              Edit
            </Button>
            <Button
              type="reset"
              variant="contained"
              size="large"
              style={{ marginTop: '16px' }}
              sx={{
                background: '#0d2134',
                '&:hover': { background: '#d93226' },
              }}
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileComp;
