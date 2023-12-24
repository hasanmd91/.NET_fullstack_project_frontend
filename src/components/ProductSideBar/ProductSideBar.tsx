import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import Button from '../Button/Button';
import { shades } from '../../Theme';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { category } from '../../types/category';
import { getAllCategoryAsync } from '../../redux/thunks/categoryThunk';
import {
  getAllProductsAsync,
  getAllProductsByCategoryAsync,
} from '../../redux/thunks/productThunk';
import { sortProduct } from '../../redux/reducers/productReducer';

type ProductSideBarPropsType = {};

const ProductSideBar: React.FC<ProductSideBarPropsType> = () => {
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  return (
    <Stack
      width={'200px'}
      sx={{
        backgroundColor: shades.primary[500],
        padding: '20px',
        minHeight: '70vh',
      }}
    >
      <Button onClick={() => dispatch(sortProduct('HIGH_TO_LOW_PRICE'))}>
        Price High To Low
      </Button>
      <Button onClick={() => dispatch(sortProduct('LOW_TO_HIGH_PRICE'))}>
        Price Low To High
      </Button>
      <Button onClick={() => dispatch(getAllProductsAsync())}>
        All Products
      </Button>
      {categories.map((c: category) => {
        return (
          <Button
            key={c.id}
            onClick={() => dispatch(getAllProductsByCategoryAsync(c.id))}
          >
            {c.name}
          </Button>
        );
      })}
    </Stack>
  );
};

export default ProductSideBar;
