import * as React from 'react';
import Typography from '@mui/material/Typography';
import useAppSelector from '../../hooks/useAppSelector';
import { orderDetail } from '../../types/Order';
import { Alert, Box, Button, Container } from '@mui/material';
import { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { getOrderStatusColor } from '../../utils/statusColor';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  deleteOrderAsync,
  getCurrentUserAllOrdersAsync,
} from '../../redux/thunks/OrederThunk';
import { cancelAOrderAsync } from '../../redux/thunks/userThunk';

const OrderList = () => {
  const { currentUser, currentUserOrder } = useAppSelector(
    (state) => state.user
  );
  const { error } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAllOrdersAsync(currentUser?.id));
  }, [currentUser.id, dispatch]);

  const columns: GridColDef[] = [
    {
      field: 'createdDate',
      headerName: 'Order Date',
      width: 200,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.createdDate).format('YYYY-MM-DD')}{' '}
          </Typography>
        );
      },
    },

    {
      field: 'totalPrice',
      headerName: 'Total',
      renderCell: (params) => <Typography>${params.row.totalPrice}</Typography>,
    },
    {
      field: 'orderStatus',
      headerName: 'OrderStatus',
      renderCell: (params) => {
        return (
          <Typography color={getOrderStatusColor(params.row.orderStatus)}>
            {params.row.orderStatus}
          </Typography>
        );
      },
    },

    {
      field: 'orderDetails',
      headerName: 'Order Details',
      width: 200,

      renderCell: (params) => {
        const orderDetails = params.row.orderDetails;

        if (orderDetails && orderDetails.length > 0) {
          return (
            <Box>
              {orderDetails?.map((detail: orderDetail) => (
                <Box key={detail.id}>
                  <Typography color="Highlight">
                    {detail.product.title}, {detail.quantity}x
                  </Typography>
                </Box>
              ))}
            </Box>
          );
        }
        return null;
      },
    },
    {
      field: 'cancelOrder',
      headerName: 'Cancel',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="warning"
            onClick={() => dispatch(cancelAOrderAsync(params.row.id))}
          >
            Cancel
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
          onClick={() => dispatch(deleteOrderAsync(params.row.id))}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Container
      sx={{
        minHeight: '60vh',
        marginTop: '30px',
      }}
    >
      <DataGrid
        columns={columns}
        rows={currentUserOrder}
        getRowId={(row) => row.id}
        getRowHeight={() => 'auto'}
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

      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default OrderList;
