import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, CircularProgress, Container, Grid } from '@mui/material';

import CenteredContainer from '../components/CenterContainer/CenterContainer';
import NewProductForm from '../components/NewProductForm/NewProductForm';
import AdminDataCard from '../components/AdminDataCard/AdminDataCard';
import { newProduct, newProductYup, product } from '../types/product';
import AdminSideBar from '../components/AdminSideBar/AdminSideBar';
import { schema } from '../validation/productDataValidation';
import Pagination from '../components/Pagination/Pagination';
import SearchBar from '../components/InputSearch/SearchBar';
import { usePagination } from '../hooks/usePagination';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import useDebounce from '../hooks/useDebounce';
import Modal from '../components/Modal/Modal';
import {
  createNewProductAsync,
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../redux/thunks/productThunk';

const AdminDashbord = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const { debouncedValue } = useDebounce(search);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
    products,
    30
  );

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newProductYup>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getProductByTitleAsync(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandeler = (data: newProductYup) => {
    const newData: newProduct = {
      ...data,
      images: data.images.split('\n').map((url) => url.trim()),
    };
    dispatch(createNewProductAsync(newData));

    if (!error) {
      handleClose();
    }
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
        <Alert security="error">{error}</Alert>;
      </CenteredContainer>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ marginTop: '1rem' }}>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <AdminSideBar handleOpen={handleOpen} />
        </Grid>

        <Grid item md={10} xs={12}>
          <SearchBar search={search} setSearch={setSearch} />

          {currentProducts.map((product: product) => (
            <AdminDataCard product={product} key={product.id} />
          ))}

          <Pagination
            count={pageLimit}
            currentPage={currentPage}
            setPage={setPage}
          />
        </Grid>
      </Grid>
      <Modal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        error={error ? error : ''}
      >
        <NewProductForm
          handleSubmit={handleSubmit}
          submitHandeler={submitHandeler}
          control={control}
          reset={reset}
          errors={errors}
        />
      </Modal>
    </Container>
  );
};

export default AdminDashbord;
