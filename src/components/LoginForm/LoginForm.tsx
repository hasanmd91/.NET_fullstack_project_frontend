import React from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';

import TextField from '../TextField/TextField';
import useAppSelector from '../../Hooks/useAppSelector';
import Link from '../Link/Link';

type LoginFormType = {
  email: string;
  password: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const LoginForm: React.FC<LoginFormType> = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  const { error, errorMsg } = useAppSelector((state) => state.auth);

  return (
    <Container
      sx={{
        height: '100vh',
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
          maxWidth: '800px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5"> Welcome Back!</Typography>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={error}
            helperText={errorMsg}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            error={error}
            helperText={errorMsg}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              background: '#0d2134',
              margin: '20px 0',
              '&:hover': { background: '#d93226' },
            }}
          >
            Login
          </Button>
        </form>
        <Box>
          <Typography variant="h6">Are you a new customer ?</Typography>
          <Link to="/register">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              style={{ marginTop: '16px' }}
              sx={{
                background: '#0d2134',
                '&:hover': { background: '#d93226' },
              }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
