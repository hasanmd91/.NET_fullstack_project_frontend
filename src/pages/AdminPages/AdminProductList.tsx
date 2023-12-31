import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/InputSearch/SearchBar';
import useAppDispatch from '../../hooks/useAppDispatch';
import useDebounce from '../../hooks/useDebounce';
import useAppSelector from '../../hooks/useAppSelector';
import { usePagination } from '../../hooks/usePagination';
import AdminDataCard from '../../components/AdminDataCard/AdminDataCard';
import Pagination from '../../components/Pagination/Pagination';
import { product } from '../../types/product';
import {
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../../redux/thunks/productThunk';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import { Alert, CircularProgress } from '@mui/material';

const AdminProductList = () => {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const { debouncedValue } = useDebounce(search);
  const { products, loading, error } = useAppSelector((state) => state.product);

  const { currentPage, pageLimit, currentProducts, setPage } = usePagination(
    products,
    30
  );

  useEffect(() => {
    if (!debouncedValue) return;

    dispatch(getProductByTitleAsync(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <CenteredContainer>
        <CircularProgress color="error" size="5rem" />
      </CenteredContainer>
    );
  }

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      {currentProducts.map((product: product) => (
        <AdminDataCard product={product} key={product.id} />
      ))}

      <Pagination
        count={pageLimit}
        currentPage={currentPage}
        setPage={setPage}
      />

      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default AdminProductList;
