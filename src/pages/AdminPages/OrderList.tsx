import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAppSelector from '../../hooks/useAppSelector';
import { OrderStatus, order } from '../../types/Order';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
} from '@mui/material';
import {
  getAllOrdersAsync,
  updateOrderAsync,
} from '../../redux/thunks/OrederThunk';
import { useEffect, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import Button from '../../components/Button/Button';
import { getOrderStatusColor } from '../../utils/statusColor';

const OrderList = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    OrderStatus.PAID
  );

  const { orders, loading, error } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrderId('');
  };

  const handleStatusUpdate = () => {
    dispatch(
      updateOrderAsync({ id: selectedOrderId, orderStatus: selectedStatus })
    );
    setOpenModal(false);
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
        <Alert severity="error">{error}</Alert>
      </CenteredContainer>
    );
  }

  return (
    <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
      <Typography variant="h2" gutterBottom>
        Order List
      </Typography>

      {orders.map((od: order, index: React.Key | null | undefined) => (
        <Accordion key={index} sx={{ marginTop: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexBasis: '33%', textAlign: 'left' }}>
              <Typography variant="h6">
                <strong>Order Number:</strong> {od.id}
              </Typography>
            </Box>
            <Box sx={{ flexBasis: '33%', textAlign: 'center' }}>
              <Typography variant="h6">
                <strong>Order By: </strong>
                {`${od.user.firstName} ${od.user.lastName}`}
              </Typography>
            </Box>
            <Box sx={{ flexBasis: '33%', textAlign: 'right' }}>
              <Typography variant="h6">
                <strong>Address: </strong>
                {`${od.user.address}, ${od.user.zip} ${od.user.city}`}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ width: '100%', padding: '10px' }}>
              <Typography variant="h6"></Typography>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="OrderStatus" />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: getOrderStatusColor(od.orderStatus),
                    }}
                  >
                    {od.orderStatus}
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    ${od.totalPrice}
                  </Typography>
                </ListItem>

                {od.orderDetails.map((item, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={item.product.title} />
                    <Typography variant="caption">{item.quantity}X </Typography>
                    <Typography variant="body2">
                      ${item.product.price}
                    </Typography>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="Delivery" />
                  <Typography variant="body2">Free</Typography>
                </ListItem>
              </List>
              <Button onClick={() => handleOpenModal(od.id)}>
                {' '}
                Update Status
              </Button>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="status-update-modal"
        aria-describedby="status-update-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
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
          </FormControl>
          <Button variant="contained" onClick={handleStatusUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default OrderList;
