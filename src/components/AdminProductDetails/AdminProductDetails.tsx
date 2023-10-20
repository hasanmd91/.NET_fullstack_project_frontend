import React, { useEffect } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { useParams } from 'react-router-dom';
import {
  getAProductsAsync,
  updateProductAsync,
} from '../../redux/thunks/productThunk';
import useAppSelector from '../../hooks/useAppSelector';
import { Controller, useForm } from 'react-hook-form';
import { NewProduct, product } from '../../types/product';
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import Info from '../Info/Info';
import CenteredContainer from '../CenterContainer/CenterContainer';

const AdminProductDetails = () => {
  const { product, error, loading } = useAppSelector((state) => state.product);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productId = Number(id);

  useEffect(() => {
    if (id) {
      dispatch(getAProductsAsync(productId));
    }
  }, [dispatch, id, productId]);

  const form = useForm<Omit<NewProduct, 'id'>>();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
  } = form;

  const submitHandeler = (data: Partial<product>) => {
    console.log('this is submitted data', data);
    if (isDirty) {
      console.log(isDirty);
      dispatch(updateProductAsync({ updatedData: data, id: productId }));
    } else return;
  };

  if (loading) {
    return (
      <CenteredContainer>
        <CircularProgress />
      </CenteredContainer>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ marginTop: '5rem', padding: '1rem' }}>
        <Typography variant="h4" gutterBottom color={'GrayText'}>
          Customize Product data
        </Typography>
        {isSubmitSuccessful && <Info text=" product updated" />}
        <form
          onSubmit={handleSubmit(submitHandeler)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Controller
            name="title"
            control={control}
            defaultValue={product?.title}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.title?.message}
                error={errors.title ? true : false}
                label={'title'}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue={product?.description}
            render={({ field }) => (
              <TextField
                {...field}
                helperText={errors.description?.message}
                error={errors.description ? true : false}
                label={'description'}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            defaultValue={product?.price}
            render={({ field }) => (
              <TextField
                type="number"
                {...field}
                helperText={errors.price?.message}
                error={errors.price ? true : false}
                label={'price'}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue={5}
                  label="Category"
                  error={Boolean(errors.categoryId)}
                >
                  <MenuItem value={1}>Clothes</MenuItem>
                  <MenuItem value={2}>Electronics</MenuItem>
                  <MenuItem value={3}>Furniture</MenuItem>
                  <MenuItem value={4}>Shoes</MenuItem>
                  <MenuItem value={5}>Others</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <TextField
            disabled
            defaultValue={''}
            label={`Product ID :${product?.id}`}
          />

          <Box>
            <Button
              sx={{ marginRight: '3px' }}
              disabled={isSubmitting || !isDirty}
            >
              Submit
            </Button>
            <Button type="reset" onClick={() => reset()}>
              Reset
            </Button>
          </Box>
        </form>

        {error && <Info severity="error" text={error} />}
      </Paper>
    </Container>
  );
};

export default AdminProductDetails;
