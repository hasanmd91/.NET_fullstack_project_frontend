import axios, { AxiosError } from 'axios';
import { Review, newReview } from '../types/product';

export const createNewReview = async (
  newReviewData: newReview
): Promise<Review | string> => {
  try {
    const response = await axios.post<Review>(
      `http://localhost:5137/api/review/`,
      newReviewData
    );
    const createdReview: Review = response.data;
    return createdReview;
  } catch (error) {
    const err = error as AxiosError;
    return err.message;
  }
};
