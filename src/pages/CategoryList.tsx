import React, { useState } from 'react';
import useAppSelector from '../hooks/useAppSelector';
import { category, updatedCategory } from '../types/category';
import { Box, Input, Paper } from '@mui/material';
import {
  deleteCategoryAsync,
  updateCategoryAsync,
} from '../redux/thunks/categoryThunk';
import useAppDispatch from '../hooks/useAppDispatch';
import Button from '../components/Button/Button';

const CategoryList = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updatedName, setUpdateName] = useState<string>('');

  const dispatch = useAppDispatch();

  console.log(updatedName);
  return (
    <Paper>
      {categories.map((category: category) => (
        <Paper
          key={category.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 20px',
          }}
        >
          <form>
            <Input
              defaultValue={category.name}
              disabled={!editMode}
              onChange={(e) => setUpdateName(e.target.value)}
            />
          </form>
          <Box marginLeft={10}>
            Category Id: <strong> {category.id}</strong>
          </Box>

          <Box display={'flex'} gap={1}>
            {!editMode && (
              <Button
                onClick={() => setEditMode((prevEditMode) => !prevEditMode)}
              >
                Update
              </Button>
            )}

            {editMode && (
              <Button
                onClick={() => {
                  dispatch(
                    updateCategoryAsync({
                      id: category.id,
                      name: updatedName ? updatedName : category.name,
                    })
                  );

                  setEditMode(!editMode);
                }}
              >
                Submit
              </Button>
            )}

            <Button onClick={() => dispatch(deleteCategoryAsync(category.id))}>
              Delete{' '}
            </Button>
          </Box>
        </Paper>
      ))}
    </Paper>
  );
};

export default CategoryList;
