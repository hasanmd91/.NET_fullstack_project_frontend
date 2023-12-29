import { createStore } from '../../redux/store';
import productsServer from '../server/productServer';
import productReducer, {
  productStateType,
  sortProduct,
} from '../../redux/reducers/productReducer';
import {
  createNewProductAsync,
  deleteProductAsync,
  getAProductsAsync,
  getAllProductsAsync,
  getAllProductsByCategoryAsync,
  getProductByTitleAsync,
  updateProductAsync,
} from '../../redux/thunks/productThunk';
import productsData from '../Data/productsData';
import { newProduct } from '../../types/product';

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

    expect(products[0].price).toBe(350);
    expect(products[1].price).toBe(250);
    expect(products[2].price).toBe(150);
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

    expect(products[0].price).toBe(150);
    expect(products[1].price).toBe(250);
    expect(products[2].price).toBe(350);
  });

  test('Should sort all products by name A to Z', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(state, sortProduct('A-Z')).products;

    expect(products[0].title).toBe('Air Max');
    expect(products[1].title).toBe('Jordan');
    expect(products[2].title).toBe('Performance');
  });

  test('Should sort all products by name Z to A', () => {
    const state: productStateType = {
      products: productsData,
      loading: false,
      error: '',
    };
    const products = productReducer(state, sortProduct('Z-A')).products;

    expect(products[0].title).toBe('Performance');
    expect(products[1].title).toBe('Jordan');
    expect(products[2].title).toBe('Air Max');
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

  test('Should get all products in the same category', async () => {
    const categoryId = productsData[0].categoryId;
    await store.dispatch(getAllProductsByCategoryAsync(categoryId));
    expect(store.getState().product.products).toHaveLength(2);
    expect(store.getState().product.products[0].category.name).toBe('Men');
    expect(store.getState().product.products[0].category.name).toBe('Men');
  });

  test('should not create product with wrong category id', async () => {
    await store.dispatch(getAllProductsAsync());

    const input: newProduct = {
      title: 'test product',
      description: 'test product',
      price: 100,
      categoryId: '10',
      quantity: 10,
      images: [{ imageUrl: 'image 1' }],
    };
    await store.dispatch(createNewProductAsync(input));
    expect(store.getState().product.products.length).toBe(3);
    expect(store.getState().product.error).toBe(
      'Request failed with status code 400'
    );
    expect(store.getState().product.error).toBeDefined();
  });

  test('Should create a product', async () => {
    await store.dispatch(getAllProductsAsync());
    const NewProduct: newProduct = {
      title: 'test product',
      description: 'test product',
      price: 100,
      categoryId: '1',
      quantity: 10,
      images: [{ imageUrl: 'image 1' }],
    };
    await store.dispatch(createNewProductAsync(NewProduct));
    expect(store.getState().product.products.length).toBe(4);
  });

  test('Should update a product', async () => {
    const id = productsData[1].id;
    const updatedData = {
      title: 'Sports',
      description: 'test product',
      price: 100,
      categoryId: '1',
      quantity: 10,
      images: [{ imageUrl: 'image 1' }],
    };

    await store.dispatch(getAllProductsAsync());
    await store.dispatch(updateProductAsync({ id, updatedData }));
    expect(store.getState().product.products[1].title).toBe('Sports');
  });

  test('Should delete a product', async () => {
    await store.dispatch(getAllProductsAsync());
    expect(store.getState().product.products).toHaveLength(4);

    const id = productsData[0].id;
    const { payload } = await store.dispatch(deleteProductAsync(id));
    expect(payload).toBe(id);
    expect(store.getState().product.products).toHaveLength(3);
  });

  test('Should get a product by name getProductByTitleAsync', async () => {
    await store.dispatch(getProductByTitleAsync('Jordan'));

    expect(store.getState().product.products).toHaveLength(1);
    expect(store.getState().product.products[0].title).toBe('Jordan');
  });
});
