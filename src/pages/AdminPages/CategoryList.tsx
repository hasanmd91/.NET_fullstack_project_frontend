import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import CenteredContainer from '../../components/CenterContainer/CenterContainer';
import useAppSelector from '../../hooks/useAppSelector';
import { category } from './../../types/category';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../../redux/thunks/categoryThunk';
import {
  Alert,
  Box,
  CircularProgress,
  Input,
  Paper,
  Modal,
  Fade,
  Typography,
  ListItemSecondaryAction,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';

const EditCategoryModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  category: category;
  onUpdateCategory: (updatedCategory: category) => void;
}> = ({ open, handleClose, category, onUpdateCategory }) => {
  const [updatedName, setUpdatedName] = useState(category.name);

  const handleUpdate = () => {
    onUpdateCategory({
      id: category.id,
      name: updatedName,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
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
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <Button onClick={handleUpdate}>Update</Button>
        </Box>
      </Fade>
    </Modal>
  );
};

const CategoryList: React.FC = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );

  const [selectedCategory, setSelectedCategory] = useState<category | null>(
    null
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  const handleOpenModal = (category: category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleUpdateCategory = (updatedCategory: category) => {
    dispatch(updateCategoryAsync(updatedCategory));
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
    <Paper>
      <List>
        {categories.map((category: category) => (
          <ListItem
            key={category.id}
            sx={{ padding: '5px 10px', marginBottom: '10px' }}
          >
            <ListItemText>
              <Typography variant="h6">{category.name}</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => handleOpenModal(category)}>
                  Update
                </Button>
                <Button
                  onClick={() => {
                    dispatch(deleteCategoryAsync(category.id));
                    setTimeout(() => {
                      dispatch(getAllCategoryAsync());
                    }, 1000);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {selectedCategory && (
        <EditCategoryModal
          open={true}
          handleClose={handleCloseModal}
          category={selectedCategory}
          onUpdateCategory={handleUpdateCategory}
        />
      )}
    </Paper>
  );
};

export default CategoryList;
