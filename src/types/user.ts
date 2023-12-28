import { order } from './Order';

export enum userRole {
  admin = 'Admin',
  customer = 'User',
}
export type user = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: userRole;
  avatar: string;
  address: string;
  zip: string;
  city: string;
  orders?: order[];
};

export type registerUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  zip: string;
  city: string;
};

export type updateUserDataType = {
  data: registerUser;
  id: string;
};

export type isEmailAvailable = {
  isAvailable: boolean;
};

export type emailType = {
  email: string;
};
