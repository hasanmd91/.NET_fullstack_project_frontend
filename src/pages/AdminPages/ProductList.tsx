import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/InputSearch/SearchBar';
import useAppDispatch from '../../hooks/useAppDispatch';
import useDebounce from '../../hooks/useDebounce';
import useAppSelector from '../../hooks/useAppSelector';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  deleteProductAsync,
  getAllProductsAsync,
  getProductByTitleAsync,
} from '../../redux/thunks/productThunk';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import { Alert, CircularProgress } from '@mui/material';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import UpdateProduct from './AddProduct';
import { product } from '../../types/product';
import AddIcon from '@mui/icons-material/Add';

const AdminProductList = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<product | undefined>();

  const dispatch = useAppDispatch();
  const { debouncedValue } = useDebounce(search);
  const { products, loading, error } = useAppSelector((state) => state.product);
  useEffect(() => {
    if (!debouncedValue) return;
    dispatch(getProductByTitleAsync(debouncedValue));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', hideable: true, width: 250 },
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.category.name}`,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      editable: true,
    },
    { field: 'price', headerName: 'Price' },
    { field: 'quantity', headerName: 'Stock' },
    {
      field: 'edit',
      headerName: 'Edit',
      editable: false,

      renderCell: (params) => (
        <Button
          sx={{ marginTop: 0 }}
          onClick={() => {
            setSelectedRow(params.row);
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      editable: false,
      renderCell: (params) => (
        <Button
          sx={{ marginRight: '5px', marginTop: 0 }}
          onClick={() => dispatch(deleteProductAsync(params.row.id))}
        >
          Delete
        </Button>
      ),
    },
  ];

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
      <Button
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setSelectedRow(undefined);
        }}
      >
        Add New Product <AddIcon />
      </Button>
      <DataGrid
        columns={columns}
        rows={products}
        getRowId={(row) => row.id}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
      />
      {isModalOpen && (
        <Modal open={isModalOpen} handleClose={() => !isModalOpen}>
          <UpdateProduct
            rowData={selectedRow}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default AdminProductList;
