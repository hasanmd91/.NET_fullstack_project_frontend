import { rest } from 'msw';
import { setupServer } from 'msw/node';
import BASE_URL from '../../shared/BASE_URL';
import productsData from '../Data/productsData';
import { newProduct } from '../../types/product';

export const handlers = [
  rest.get(`${BASE_URL}/products`, async (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(`${BASE_URL}/products`, async (req, res, ctx) => {
    const { id } = req.params;
    const product = productsData.find((product) => product.id === Number(id));
    if (product) {
      return res(ctx.json(product));
    }
  }),

  rest.post(`${BASE_URL}/products`, async (req, res, ctx) => {
    const product: newProduct = await req.json();
    return res(ctx.json(product));
  }),

  rest.delete(`${BASE_URL}/products/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const product = productsData.find((product) => product.id === Number(id));
    if (product) {
      return res(ctx.json(true));
    } else {
      return res(ctx.status(404, 'Product is not found'));
    }
  }),
];

const productsServer = setupServer(...handlers);

export default productsServer;
