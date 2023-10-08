import React from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import { Navigate } from 'react-router-dom';
import { userRole } from '../types/user';

type CustomerAuthGurdType = {
  children: React.ReactElement;
};

const CustomerAuthGurd: React.FC<CustomerAuthGurdType> = ({ children }) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo?.role === userRole.customer ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default CustomerAuthGurd;
