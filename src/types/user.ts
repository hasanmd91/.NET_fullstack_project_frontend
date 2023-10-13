export enum userRole {
  admin = 'admin',
  customer = 'customer',
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
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
