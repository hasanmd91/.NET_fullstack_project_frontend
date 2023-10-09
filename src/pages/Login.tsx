import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import useAppDispatch from '../Hooks/useAppDispatch';
import { loginAsync } from '../redux/methods/authMethod';
import useAppSelector from '../Hooks/useAppSelector';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loggedIn } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ email, password }));
  };

  if (loggedIn) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <LoginForm
      email={email}
      password={password}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
