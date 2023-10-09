import axiosInstance from '../shared/axiosInstance';
import { user } from '../types/user';

const fetchUserProfile = async (accessToken: string) => {
  const response = await axiosInstance.get<user>('auth/profile', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export default fetchUserProfile;
