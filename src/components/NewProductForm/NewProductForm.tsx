import React, { useEffect } from 'react';
import {
  Container,
  TextField,
  Alert,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormReset,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';

import useAppSelector from '../../hooks/useAppSelector';
import { NewProduct } from '../../types/product';
import Button from '../Button/Button';

type NewProductFormType = {
  handleSubmit: UseFormHandleSubmit<NewProduct>;
  submitHandeler: SubmitHandler<NewProduct>;
  reset: UseFormReset<NewProduct>;
  errors: FieldErrors<NewProduct>;
  register: UseFormRegister<NewProduct>;
  isDirty: boolean;
  isSubmitting: boolean;
};

const NewProductForm: React.FC<NewProductFormType> = ({
  handleSubmit,
  submitHandeler,
  register,
  errors,
  reset,
  isDirty,
  isSubmitting,
}) => {
  const { error } = useAppSelector((state) => state.user);

  const { fields, append, remove } = useFieldArray({ name: 'images' });

  useEffect(() => {
    reset();
    remove();
  }, [reset, remove]);

  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [fields.length, append]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add new product
      </Typography>
      <form
        onSubmit={handleSubmit(submitHandeler)}
        noValidate
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextField
          type="text"
          id="title"
          label="Title"
          {...register('title')}
          helperText={errors.title?.message}
          error={errors.title ? true : false}
        />

        <TextField
          type="text"
          id="description"
          label="Description"
          {...register('description')}
          helperText={errors.description?.message}
          error={errors.description ? true : false}
        />

        <TextField
          type="number"
          id="price"
          label="Price"
          {...register('price')}
          helperText={errors.price?.message}
          error={errors.price ? true : false}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            {...register('categoryId')}
            defaultValue={1}
            label="Category"
            error={Boolean(errors.categoryId)}
          >
            <MenuItem value={1}>Clothes</MenuItem>
            <MenuItem value={2}>Electronics</MenuItem>
            <MenuItem value={3}>Furniture</MenuItem>
            <MenuItem value={4}>Shoes</MenuItem>
            <MenuItem value={5}>Others</MenuItem>
          </Select>
        </FormControl>

        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              display: 'flex',
            }}
          >
            <TextField
              fullWidth
              type="text"
              id={`images[${index}]`}
              label="Image"
              {...register(`images.${index}`)}
              helperText={errors.images?.message}
              error={errors.images ? true : false}
            />
          </Box>
        ))}

        <Button
          sx={{ width: '150px' }}
          type="button"
          onClick={() => append(' ')}
        >
          Add Image
        </Button>

        <Box>
          <Button
            disabled={!isDirty || isSubmitting}
            sx={{ marginRight: '10px' }}
            onClick={() => handleSubmit}
          >
            Submit
          </Button>
          <Button type="reset" onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default NewProductForm;
