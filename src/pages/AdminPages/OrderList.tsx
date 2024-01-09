import * as React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import { OrderStatus, order, orderDetail } from '../../types/Order';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  deleteOrderAsync,
  getAllOrdersAsync,
  updateOrderAsync,
} from '../../redux/thunks/OrederThunk';
import { useEffect, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import { getOrderStatusColor } from '../../utils/statusColor';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../components/Modal/Modal';
import moment from 'moment';

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<order | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.PAID
  );

  const { orders, loading, error } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  const handleStatusUpdate = () => {
    if (selectedRow?.id) {
      dispatch(
        updateOrderAsync({ id: selectedRow?.id, orderStatus: selectedStatus })
      );
    }
    setIsModalOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Customer ',

      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.user.firstName} ${params.row.user.lastName}`,
    },
    {
      field: 'delivery ',
      headerName: 'Delivery Address',
      width: 300,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.user.address} ${params.row.user.zip} ${params.row.user.city}`,
    },

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
              {orderDetails.map((detail: orderDetail) => (
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
      field: 'updateOrderStatus',
      headerName: 'Update',
      renderCell: (params) => {
        return (
          <Button
            variant="text"
            color="warning"
            onClick={() => {
              setIsModalOpen(true);
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
          onClick={() => dispatch(deleteOrderAsync(params.row.id))}
        >
          <DeleteIcon />
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
    <Container>
      <DataGrid
        columns={columns}
        rows={orders}
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
      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(!isModalOpen)}
      >
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Update Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
          >
            {Object.keys(OrderStatus).map((key) => (
              <MenuItem
                key={key}
                value={OrderStatus[key as keyof typeof OrderStatus]}
              >
                {OrderStatus[key as keyof typeof OrderStatus]}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            sx={{ marginTop: '5px' }}
            onClick={handleStatusUpdate}
          >
            Update
          </Button>
        </FormControl>
      </Modal>
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default OrderList;
