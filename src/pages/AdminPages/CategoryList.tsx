import React, { useEffect, useState } from 'react';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import useAppSelector from '../../hooks/useAppSelector';
import { category } from './../../types/category';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../../redux/thunks/categoryThunk';
import { Alert, CircularProgress, Container } from '@mui/material';

const CategoryList: React.FC = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );

  const [selectedCategory, setSelectedCategory] = useState<category | null>(
    null
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  const handleOpenModal = (category: category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleUpdateCategory = (updatedCategory: category) => {
    dispatch(updateCategoryAsync(updatedCategory));
  };

  if (loading) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <Alert severity="error">{error}</Alert>
      </CenteredContainer>
    );
  }

  return <Container></Container>;
};

export default CategoryList;
