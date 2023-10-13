import {
  createNewProductAsync,
  getAllProductsAsync,
} from '../../redux/methods/productMethod';
import { createStore } from '../../redux/store';
import { newProduct } from '../../types/product';
import productsServer from '../server/productServer';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

describe('Async actions', () => {
  test('Should fetch all products', async () => {
    await store.dispatch(getAllProductsAsync());
    expect(store.getState().product.products).toHaveLength(3);
  });

  test('Should create a product', async () => {
    const newproduct: newProduct = {
      title: 'Test Create Product1',
      price: 500,
      description: 'Test Create Product1',
      categoryId: 1,
      images: ['https://api.lorem.space/image/dummyImage'],
    };

    await store.dispatch(createNewProductAsync(newproduct));
    expect(store.getState().product.products.length).toBe(1);
  });

  test('Should create few products one by one', async () => {
    const newproduct0: newProduct = {
      title: 'Test Create Product1',
      price: 500,
      description: 'Test Create Product1',
      categoryId: 1,
      images: ['https://api.lorem.space/image/dummyImage'],
    };

    await store.dispatch(createNewProductAsync(newproduct0));
    expect(store.getState().product.products.length).toBe(1);

    const newproduct1: newProduct = {
      title: 'Test Create Product1',
      price: 500,
      description: 'Test Create Product1',
      categoryId: 1,
      images: ['https://api.lorem.space/image/dummyImage'],
    };

    await store.dispatch(createNewProductAsync(newproduct1));
    expect(store.getState().product.products.length).toBe(2);
  });
});
