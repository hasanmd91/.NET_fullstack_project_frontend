import axios, { AxiosError } from 'axios';
import { Review, newReview } from '../types/product';

export const createNewReview = async (
  newReviewData: newReview
): Promise<Review | string> => {
  try {
    const response = await axios.post<Review>(
      `https://ecommershop.azurewebsites.net/api/review/`,
      newReviewData
    );
    const createdReview: Review = response.data;
    return createdReview;
  } catch (error) {
    const err = error as AxiosError;
    return err.message;
  }
};
