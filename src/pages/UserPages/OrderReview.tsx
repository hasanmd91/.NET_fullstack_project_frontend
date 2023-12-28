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
import { order } from '../../types/Order';
import { Alert, CircularProgress, Container, Paper } from '@mui/material';
import { formatDateString } from '../../utils/formatDateString';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';

const OrderReview = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { orders, loading, error } = currentUser;

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
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h2" gutterBottom>
        Order List
      </Typography>

      {orders?.map((od: order, index: React.Key | null | undefined) => (
        <Accordion key={index} sx={{ marginTop: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <strong>Order Number:</strong> {od.id}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ width: '100%', padding: '10px' }}>
              <Typography variant="h6">
                <strong>Order Date:</strong>{' '}
                {od?.createdDate && formatDateString(od?.createdDate)}
              </Typography>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="OrderStatus" />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: 'green' }}
                  >
                    {od.orderStatus}
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
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    ${od.totalPrice}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default OrderReview;
