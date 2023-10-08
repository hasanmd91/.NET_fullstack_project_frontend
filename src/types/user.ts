export interface user {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: userRole;
  avatar: string;
}

export enum userRole {
  admin = 'admin',
  customer = 'customer',
}
