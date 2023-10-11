import React from 'react';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';

import { updateUser } from '../types/user';
import useAppDispatch from '../Hooks/useAppDispatch';
import useAppSelector from '../Hooks/useAppSelector';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserEditschema } from '../Validation/UserEditschema';
import { updateUserAsync } from '../redux/methods/userMethod';
import ProfileComp from '../components/ProfileComp/ProfileComp';
import CenteredContainer from '../components/CenterContainer/CenterContainer';

const Profile: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUser>({
    resolver: yupResolver(UserEditschema),
  });

  const submitHandeler = (data: updateUser) => {
    if (currentUser?.id) {
      const id = parseInt(currentUser.id);
      dispatch(updateUserAsync({ data, id }));
    }
  };

  if (!currentUser) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  return (
    <ProfileComp
      handleSubmit={handleSubmit}
      submitHandeler={submitHandeler}
      control={control}
      reset={reset}
      errors={errors}
    />
  );
};

export default Profile;
