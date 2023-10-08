import React from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import { Navigate } from 'react-router-dom';
import { userRole } from '../types/user';

type AdminAuthGurdType = {
  children: React.ReactElement;
};

const AdminAuthGurd: React.FC<AdminAuthGurdType> = ({ children }) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  if (children) {
    return userInfo?.role === userRole.admin ? (
      <>{children}</>
    ) : (
      <Navigate to="/" replace={true} />
    );
  }
  return null;
};

export default AdminAuthGurd;
