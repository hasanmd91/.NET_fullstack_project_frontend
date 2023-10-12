import { getAllProductsAsync } from '../../redux/methods/productMethod';
import {
  ProductReducerStateType,
  sortProduct,
} from '../../redux/reducers/productReducer';
import { allProductsMockData } from '../../utils/MockTestData';
import { createStore } from '../../redux/store';
import productServer from '../mockApi/productServer';
import { create } from 'domain';

let store: ProductReducerStateType;

beforeEach(() => {});

beforeAll(() => {
  productServer.listen();
});

afterAll(() => productServer.close());

describe('Product reducer actions', () => {
  it('should sort product by price', () => {});
});
