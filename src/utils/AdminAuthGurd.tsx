import React from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import { userRole } from '../types/user';

type AdminAuthGurdType = {
  children: React.ReactElement;
};

const AdminAuthGurd: React.FC<AdminAuthGurdType> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return currentUser?.role === userRole.admin ? <>{children}</> : null;
};

export default AdminAuthGurd;
