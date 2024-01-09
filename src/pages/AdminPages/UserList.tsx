import React, { useEffect } from 'react';
import { Alert, Avatar, Button, Container } from '@mui/material';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import {
  changeUserRoleAsync,
  deleteAUserAsync,
  getAllUsersAsync,
} from '../../redux/thunks/userThunk';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

const UsersList = () => {
  const { users, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  const deleteHandler = (id: string) => {
    dispatch(deleteAUserAsync(id));
  };

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => <Avatar src={params.row.avatar} />,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: 'role',
      headerName: 'Role',
      renderCell: (params) => {
        return params.row.role === 'Admin' ? (
          <>
            Admin <AdminPanelSettingsIcon />
          </>
        ) : (
          <>
            User <PersonIcon />
          </>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 300,
      valueGetter: (params) =>
        `${params.row.address} ${params.row.zip} ${params.row.city}`,
    },

    {
      field: 'edit',
      headerName: 'Edit',
      editable: false,

      renderCell: (params) => {
        if (params.row.role === 'Admin') {
          return null;
        }
        return (
          <Button
            size="small"
            variant="text"
            color="primary"
            onClick={() => dispatch(changeUserRoleAsync(params.row.id))}
          >
            <AdminPanelSettingsIcon />
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
          onClick={() => deleteHandler(params.row.id)}
        >
          <DeleteIcon />
        </Button>
      ),
    },
    {
      field: 'id',
      headerName: 'Id',
      width: 300,
    },
  ];

  return (
    <Container>
      <DataGrid columns={columns} rows={users} />
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default UsersList;
