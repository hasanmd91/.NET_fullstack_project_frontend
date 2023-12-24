import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { catgorySchema } from '../../validation/productSchema';
import { newCategory } from '../../types/category';
import { createCategoryAsync } from '../../redux/thunks/categoryThunk';
import useAppDispatch from '../../hooks/useAppDispatch';
import TextField from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';

const AddCategory = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newCategory>({
    resolver: yupResolver(catgorySchema),
  });

  const dispatch = useAppDispatch();

  const submitHandeler: SubmitHandler<newCategory> = (data: newCategory) => {
    dispatch(createCategoryAsync(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandeler)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Category Name"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Button>Add Category</Button>
      </form>
    </div>
  );
};

export default AddCategory;
