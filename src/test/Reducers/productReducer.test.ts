import { createStore } from '../../redux/store';
import { newProduct } from '../../types/product';
import productsServer from '../server/productServer';
import productsData from '../data/productsData';
import productReducer, {
  productStateType,
  sortProduct,
} from '../../redux/reducers/productReducer';
import {
  createNewProductAsync,
  deleteProductAsync,
  getAProductsAsync,
  getAllProductsAsync,
  updateProductAsync,
} from '../../redux/thunks/productThunk';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

// productReducer InitialState tests

describe('Product Reducer Initial State', () => {
  test('Should have an initial state with no products', async () => {
    expect(store.getState().product.products).toHaveLength(0);
    expect(store.getState().product.loading).toBeFalsy();
    expect(store.getState().product.error).toBeFalsy();
  });

  test('Should change the state to "pending" when fetching products', async () => {
    await store.dispatch(getAllProductsAsync.pending('pending', undefined, ''));
    expect(store.getState().product.loading).toBeTruthy();
    expect(store.getState().product.products).toHaveLength(0);
    expect(store.getState().product.error).toBeFalsy();
  });

  test('Should change the state to "rejected" when there is an error', async () => {
    store.dispatch(
      getAllProductsAsync.rejected(
        new Error(),
        '',
        undefined,
        'something went wrong'
      )
    );
    expect(store.getState().product.loading).toBeFalsy();
    expect(store.getState().product.products).toHaveLength(0);
    expect(store.getState().product.error).toBe('something went wrong');
  });
});

// productReducer action tests

describe('Product Sorting in Product Reducer', () => {
  test('Should sort all products by price high to low', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(
      state,
      sortProduct('HIGH_TO_LOW_PRICE')
    ).products;

    expect(products[0].price).toBe(500);
    expect(products[1].price).toBe(200);
    expect(products[2].price).toBe(80);
  });
  test('Should sort all products by price low to high', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(
      state,
      sortProduct('LOW_TO_HIGH_PRICE')
    ).products;

    expect(products[0].price).toBe(80);
    expect(products[1].price).toBe(200);
    expect(products[2].price).toBe(500);
  });

  test('Should sort all products by name A to Z', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(state, sortProduct('A-Z')).products;

    expect(products[0].title).toBe('Amplifire');
    expect(products[1].title).toBe('Bag');
    expect(products[2].title).toBe('Camera');
  });

  test('Should sort all products by name Z to A', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(state, sortProduct('Z-A')).products;

    expect(products[0].title).toBe('Camera');
    expect(products[1].title).toBe('Bag');
    expect(products[2].title).toBe('Amplifire');
  });
});

// productReducer thunk action tests

describe('Test async thunk actions in productsReducer', () => {
  test('Should fetch all products', async () => {
    await store.dispatch(getAllProductsAsync());
    expect(store.getState().product.products).toHaveLength(3);
    expect(store.getState().product.loading).toBeFalsy();
  });

  test('Should get a product by id', async () => {
    await store.dispatch(getAProductsAsync(productsData[0].id));
    expect(store.getState().product.product).toMatchObject(productsData[0]);
    await store.dispatch(getAProductsAsync(productsData[1].id));
    expect(store.getState().product.product).toMatchObject(productsData[1]);
  });

  test('Should create a product', async () => {
    await store.dispatch(getAllProductsAsync());

    const newproduct: newProduct = {
      title: 'Test Create Product1',
      price: 500,
      description: 'Test Create Product1',
      categoryId: 1,
      images: ['https://api.lorem.space/image/dummyImage'],
    };

    await store.dispatch(createNewProductAsync(newproduct));
    expect(store.getState().product.products.length).toBe(4);
  });

  test('Should update a product', async () => {
    const id = productsData[0].id;
    const updatedData = {
      title: 'Diaper',
      description: 'new description',
      price: 320,
    };

    await store.dispatch(getAllProductsAsync());
    await store.dispatch(updateProductAsync({ id, updatedData }));
    expect(store.getState().product.products[0].title).toBe('Diaper');
  });

  test('Should delete a product', async () => {
    await store.dispatch(getAllProductsAsync());
    expect(store.getState().product.products).toHaveLength(4);

    const id = productsData[0].id;
    const { payload } = await store.dispatch(deleteProductAsync(id));
    expect(payload).toBe(id);
    expect(store.getState().product.products).toHaveLength(3);
  });
});
