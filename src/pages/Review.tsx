import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import useAppSelector from '../hooks/useAppSelector';

const Review = () => {
  const { cartItems, totalAmount } = useAppSelector((state) => state.cart);
  const { currentUser } = useAppSelector((state) => state.user);

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    {
      name: 'Card holder',
      detail: currentUser.firstName + ' ' + currentUser.lastName,
    },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        <strong>Order summary</strong>
      </Typography>
      <List disablePadding>
        {cartItems.map((product: any) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} />
            <Typography variant="caption">{product.quantity}X </Typography>
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery" />
          <Typography variant="body2">Free</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalAmount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            <strong> Shipping</strong>
          </Typography>
          <Typography gutterBottom>
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Typography gutterBottom>
            {currentUser.address} {currentUser.city} {currentUser.zip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            <strong> Payment details</strong>
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
