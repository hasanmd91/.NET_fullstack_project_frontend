import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import MediaCard from '../components/Card/Card';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { usePagination } from '../hooks/usePagination';
import Pagination from '../components/Pagination/Pagination';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import SearchBar from '../components/InputSearch/SearchBar';
import {
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../redux/thunks/productThunk';
import useDebounce from '../hooks/useDebounce';
import ProductSideBar from '../components/ProductSideBar/ProductSideBar';

const ProductList = () => {
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [search, setSearch] = useState('');
  const { debouncedValue } = useDebounce(search);

  const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
    products,
    30
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!debouncedValue) {
      dispatch(getAllProductsAsync());
      return;
    }

    dispatch(getProductByTitleAsync(debouncedValue));
  }, [debouncedValue, dispatch]);

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
    <Container maxWidth="xl" sx={{ marginTop: '10px' }}>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <ProductSideBar />
        </Grid>

        <Grid item md={10} xs={12}>
          <Box>
            <SearchBar search={search} setSearch={setSearch} />
            {currentProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <MediaCard product={product} />
              </Link>
            ))}
          </Box>
          <Pagination
            count={pageLimit}
            currentPage={currentPage}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductList;
