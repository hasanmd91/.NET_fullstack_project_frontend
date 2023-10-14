import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import AdminDataCard from '../components/AdminDataCard/AdminDataCard';
import Modal from '../components/Modal/Modal';
import NewProductForm from '../components/NewProductForm/NewProductForm';
import { newProduct, newProductYup, product } from '../types/product';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation/productDataValidation';
import {
  createNewProductAsync,
  getAllProductsAsync,
} from '../redux/thunks/productThunk';

const AdminDashbord = () => {
  const { products, status, error } = useAppSelector((state) => state.product);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newProductYup>({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const submitHandeler = (data: newProductYup) => {
    const newData: newProduct = {
      ...data,
      images: data.images.split('\n').map((url) => url.trim()),
    };
    dispatch(createNewProductAsync(newData));

    if (!error) {
      handleClose();
    }
  };

  if (status === 'loading') {
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

  return products.length > 0 ? (
    <Container maxWidth="xl" sx={{ margin: '1rem auto' }}>
      <Grid container spacing={1}>
        <Grid item md={2} xs={12}>
          <Box
            sx={{
              backgroundColor: '#0d2134',
              minHeight: '50vh',
              padding: '2px',
            }}
          >
            <Button
              size="small"
              fullWidth
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#d93226',
                margin: '5px 0',
              }}
              onClick={handleOpen}
            >
              Add Product
            </Button>

            <Button
              size="small"
              fullWidth
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#d93226',
                margin: '5px 0',
              }}
            >
              Users
            </Button>
          </Box>
        </Grid>

        <Grid item md={10}>
          {products.map((product: product) => (
            <AdminDataCard product={product} key={product.id} />
          ))}
        </Grid>
      </Grid>
      <Modal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        error={error ? error : ''}
      >
        <NewProductForm
          handleSubmit={handleSubmit}
          submitHandeler={submitHandeler}
          control={control}
          reset={reset}
          errors={errors}
        />
      </Modal>
    </Container>
  ) : (
    <CenteredContainer>
      <Typography>NO PRODUCT IN THE STORE</Typography>
    </CenteredContainer>
  );
};

export default AdminDashbord;
