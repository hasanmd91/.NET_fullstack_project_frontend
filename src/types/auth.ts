export type userCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  referesh_token: string;
};
