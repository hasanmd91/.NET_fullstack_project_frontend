import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, CircularProgress, Container, Grid } from '@mui/material';

import CenteredContainer from '../components/CenterContainer/CenterContainer';
import AdminDataCard from '../components/AdminDataCard/AdminDataCard';
import AdminSideBar from '../components/AdminSideBar/AdminSideBar';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/InputSearch/SearchBar';
import { usePagination } from '../hooks/usePagination';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import Modal from '../components/Modal/Modal';
import {
  createNewProductAsync,
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../redux/thunks/productThunk';
import { Outlet } from 'react-router-dom';

const AdminDashbord = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
    products,
    30
  );

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
        <Alert security="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: '1rem' }}>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <Outlet />
        </Grid>

        <Grid item md={10} xs={12}></Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashbord;
