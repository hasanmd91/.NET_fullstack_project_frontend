export enum userRole {
  admin = 'admin',
  customer = 'customer',
}
export type user = {
  id: string;
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

export type newUser = Omit<user, 'id' | 'role'>;

export type updateUser = {
  newData: Partial<Omit<user, 'id' | 'role'>>;
};

export type isEmailAvailable = {
  isAvailable: boolean;
};

export type emailType = {
  email: string;
};
