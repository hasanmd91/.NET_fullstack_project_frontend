export enum userRole {
  admin = 'Admin',
  customer = 'User',
}
export type user = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: userRole;
  avatar: string;
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

export type updateUser = {
  name: string;
  email: string;
};

export type updateUserDataType = {
  data: updateUser;
  id: number;
};

export type isEmailAvailable = {
  isAvailable: boolean;
};

export type emailType = {
  email: string;
};
