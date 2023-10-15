import { createStore } from '../../redux/store';
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getAllCategoryAsync,
  updateCategoryAsync,
} from '../../redux/thunks/categoryThunk';
import { newCategory } from '../../types/category';
import categoriesData from '../data/categoriesData';
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
      image: 'https://api.lorem.space/image/dummyImage',
    };
    await store.dispatch(createCategoryAsync(newproduct));
    expect(store.getState().category.categories).toHaveLength(6);
  });

  test('Should update a category', async () => {
    await store.dispatch(getAllCategoryAsync());

    const id = categoriesData[0].id;
    const updatedData = {
      name: 'Fruits',
      image: 'https://api.lorem.space/image/dummyImage',
    };
    await store.dispatch(updateCategoryAsync({ id, updatedData }));
    expect(store.getState().category.categories[0].name).toBe('Fruits');
    expect(store.getState().category.categories[0].image).toBe(
      'https://api.lorem.space/image/dummyImage'
    );
  });

  test('Should delete a category', async () => {
    await store.dispatch(getAllCategoryAsync());

    const id = categoriesData[0].id;
    const { payload } = await store.dispatch(deleteCategoryAsync(id));
    expect(payload).toBe(id);
    expect(store.getState().category.categories.length).toBe(5);
  });
});
