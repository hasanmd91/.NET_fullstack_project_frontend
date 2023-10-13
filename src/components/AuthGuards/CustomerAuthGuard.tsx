import React from 'react';
import useAppSelector from '../../Hooks/useAppSelector';
import { userRole } from '../../types/user';

type CustomerAuthGuardType = {
  children: React.ReactElement;
};

const CustomerAuthGuard: React.FC<CustomerAuthGuardType> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser?.role === userRole.customer ? <>{children}</> : null;
};

export default CustomerAuthGuard;
