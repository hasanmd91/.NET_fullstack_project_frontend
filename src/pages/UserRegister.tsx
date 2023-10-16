import React from 'react';
import { Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerUser } from '../types/user';
import { schema } from '../validation/userValidation';
import useAppDispatch from '../hooks/useAppDispatch';
import { createNewUserAsync } from '../redux/thunks/userThunk';
import useAppSelector from '../hooks/useAppSelector';
import UserRegisterForm from '../components/UserRegisterForm/UserRegisterForm';

const UserRegister = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUser>({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const submitHandeler: SubmitHandler<registerUser> = (data: registerUser) => {
    dispatch(createNewUserAsync(data));
  };

  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <UserRegisterForm
        handleSubmit={handleSubmit}
        submitHandeler={submitHandeler}
        control={control}
        reset={reset}
        errors={errors}
      />
    </div>
  );
};

export default UserRegister;
