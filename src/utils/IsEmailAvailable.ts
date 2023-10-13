import { AxiosError } from 'axios';
import axiosInstance from '../shared/axiosInstance';

export type isEmailAvailable = {
  isAvailable: boolean;
};

const IsEmailAvailable = async (email: string) => {
  try {
    const response = await axiosInstance.get<isEmailAvailable>(
      'users/is-available',
      {
        params: {
          email: email, // Pass the email as a query parameter
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err.message;
  }
};

export default IsEmailAvailable;
