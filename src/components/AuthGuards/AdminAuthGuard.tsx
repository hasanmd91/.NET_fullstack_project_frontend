import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { userRole } from '../../types/user';

type AdminAuthGuardType = {
  children: React.ReactElement;
};

const AdminAuthGuard: React.FC<AdminAuthGuardType> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser?.role === userRole.admin ? <>{children}</> : null;
};

export default AdminAuthGuard;
