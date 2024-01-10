import React, { useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { category } from './../../types/category';
import useAppDispatch from '../../hooks/useAppDispatch';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '../../components/TextField/TextField';
import Modal from '../../components/Modal/Modal';
import AddIcon from '@mui/icons-material/Add';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../../redux/thunks/categoryThunk';
import { Button, Container, FormControl } from '@mui/material';

const CategoryList: React.FC = () => {
  const { categories } = useAppSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<category | undefined>();
  const [newCategory, setNewCategory] = useState<string>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  const handleCategoryUpdate = () => {
    try {
      if (selectedRow?.id && newCategory) {
        dispatch(
          updateCategoryAsync({
            id: selectedRow?.id,
            name: newCategory,
          })
        );
      } else {
        if (newCategory) {
          dispatch(createCategoryAsync({ name: newCategory }));
        }
      }
    } finally {
      setIsModalOpen(!isModalOpen);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 350 },
    { field: 'name', headerName: 'Name', width: 250 },
    {
      field: 'update',
      headerName: 'Update',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="warning"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setSelectedRow(params.row);
            }}
          >
            <EditIcon />
          </Button>
        );
      },
    },

    {
      field: 'delete',
      headerName: 'Delete',
      editable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="text"
          color="error"
          onClick={() => dispatch(deleteCategoryAsync(params.row.id))}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      <Button
        size="large"
        variant="contained"
        color="primary"
        sx={{ margin: '10px' }}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
          setSelectedRow(undefined);
        }}
      >
        Add New Category <AddIcon />
      </Button>
      <DataGrid
        columns={columns}
        rows={categories}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 20, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(!isModalOpen)}
      >
        <FormControl>
          <TextField
            defaultValue={selectedRow ? selectedRow.name : ''}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleCategoryUpdate}>
            {selectedRow ? 'Update' : 'Add New'}
          </Button>
        </FormControl>
      </Modal>
    </Container>
  );
};

export default CategoryList;
