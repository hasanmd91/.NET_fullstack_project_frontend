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
import { Container, Paper } from '@mui/material';

const OrderReview = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { orders } = currentUser; // Assuming orders is an array of orders

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h2" gutterBottom>
        Order List
      </Typography>

      {orders.map((od: order, index: React.Key | null | undefined) => (
        <Accordion key={index} sx={{ marginTop: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Order {od.id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ width: '100%', padding: '10px' }}>
              <List disablePadding>
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
