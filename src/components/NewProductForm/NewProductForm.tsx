import { Container, TextField, Button, Alert, Typography } from '@mui/material';
import React from 'react';
import {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormReset,
  Control,
  FieldErrors,
  Controller,
} from 'react-hook-form';
import useAppSelector from '../../Hooks/useAppSelector';
import { newProductYup } from '../../types/product';

type NewProductFormType = {
  handleSubmit: UseFormHandleSubmit<newProductYup>;
  submitHandeler: SubmitHandler<newProductYup>;
  reset: UseFormReset<newProductYup>;
  control: Control<newProductYup>;
  errors: FieldErrors<newProductYup>;
};

const NewProductForm: React.FC<NewProductFormType> = ({
  handleSubmit,
  submitHandeler,
  control,
  errors,
  reset,
}) => {
  const { error } = useAppSelector((state) => state.userReducer);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add new product
      </Typography>
      <form
        onSubmit={handleSubmit(submitHandeler)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.title?.message}
              error={errors.title ? true : false}
              label="title"
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={0}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.price?.message}
              error={errors.price ? true : false}
              label="price"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              helperText={errors.description?.message}
              error={errors.description ? true : false}
              label="description"
            />
          )}
        />

        <Controller
          name="images"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              type="text"
              helperText={errors.images?.message}
              error={errors.images ? true : false}
              label="images"
            />
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          defaultValue={0}
          rules={{ required: false }}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.categoryId?.message}
              error={errors.categoryId ? true : false}
              label="categoryId"
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ marginTop: '16px' }}
          sx={{
            marginRight: '1rem',
            background: '#0d2134',
            '&:hover': { background: '#d93226' },
          }}
          onClick={() => handleSubmit}
        >
          Submit
        </Button>
        <Button
          type="reset"
          variant="contained"
          size="large"
          style={{ marginTop: '16px' }}
          sx={{
            background: '#0d2134',
            '&:hover': { background: '#d93226' },
          }}
          onClick={() => reset()}
        >
          Reset
        </Button>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default NewProductForm;
