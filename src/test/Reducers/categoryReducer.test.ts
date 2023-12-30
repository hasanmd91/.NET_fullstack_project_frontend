import { createStore } from '../../redux/store';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../../redux/thunks/categoryThunk';
import { newCategory } from '../../types/category';
import categoriesData from '../Data/categoriesData';
import categoryServer from '../server/categoryServer';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => categoryServer.listen());

afterEach(() => categoryServer.resetHandlers());

afterAll(() => categoryServer.close());

describe('Test async thunk actions in categoryReducer', () => {
  test('Should fetch all products', async () => {
    await store.dispatch(getAllCategoryAsync());
    expect(store.getState().category.categories).toHaveLength(5);
  });

  test('Should create category', async () => {
    await store.dispatch(getAllCategoryAsync());
    const newproduct: newCategory = {
      name: 'Fruits',
    };
    await store.dispatch(createCategoryAsync(newproduct));
    expect(store.getState().category.categories).toHaveLength(6);
  });

  test('Should not create category with existing category name', async () => {
    await store.dispatch(getAllCategoryAsync());
    const newproduct: newCategory = {
      name: 'Fruits',
    };
    await store.dispatch(createCategoryAsync(newproduct));
    expect(store.getState().category.categories).toHaveLength(6);
    expect(store.getState().category.error).toBeDefined();
    expect(store.getState().category.error).toBe(
      'Request failed with status code 400'
    );
  });

  test('Should update a category', async () => {
    await store.dispatch(getAllCategoryAsync());

    const id = categoriesData[0].id;
    const updatedData = {
      id: id,
      name: 'Fruits',
    };
    await store.dispatch(updateCategoryAsync(updatedData));
    expect(store.getState().category.categories[0].name).toBe('Fruits');
  });

  test('Should delete a category', async () => {
    await store.dispatch(getAllCategoryAsync());

    const id = categoriesData[0].id;
    const { payload } = await store.dispatch(deleteCategoryAsync(id));
    expect(payload).toBe(id);
    expect(store.getState().category.categories.length).toBe(5);
  });
});
