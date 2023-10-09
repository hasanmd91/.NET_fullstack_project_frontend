import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

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
          <Typography variant="h3"> Welcome Back!</Typography>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={error}
            helperText={errorMsg}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
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
              background: '#ff6900',
              margin: '20px 0',
              '&:hover': { background: '#b24900' },
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
                background: '#ff6900',
                '&:hover': { background: '#b24900' },
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
