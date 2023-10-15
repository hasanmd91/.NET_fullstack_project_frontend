import { rest } from 'msw';
import { setupServer } from 'msw/node';
import productsData from '../data/productsData';

export const handlers = [
  rest.get(
    `https://api.escuelajs.co/api/v1/products`,
    async (req, res, ctx) => {
      return res(ctx.json(productsData));
    }
  ),

  rest.get(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const product = productsData.find((product) => product.id === Number(id));
      if (product) {
        return res(ctx.json(product));
      }
    }
  ),

  rest.post(
    `https://api.escuelajs.co/api/v1/products`,
    async (req, res, ctx) => {
      const product = await req.json();
      productsData.push(product);
      return res(ctx.json(product));
    }
  ),

  rest.get(
    `https://api.escuelajs.co/api/v1/categories/:id/products`,
    async (req, res, ctx) => {
      const { id } = req.params;

      const products = productsData.filter((product) => {
        return product.category.id === Number(id);
      });

      if (products.length) {
        return res(ctx.json(products));
      } else {
        return res(ctx.status(404, 'no product found in this category'));
      }
    }
  ),

  rest.put(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const updatedData = await req.json();
      const productIndex = productsData.findIndex(
        (product) => product.id === Number(id)
      );

      if (productIndex === -1) {
        return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
      }

      productsData[productIndex] = {
        ...productsData[productIndex],
        ...updatedData,
      };
      return res(ctx.json(productsData[productIndex]));
    }
  ),

  rest.delete(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const product = productsData.filter(
        (product) => product.id !== Number(id)
      );
      if (product) {
        return res(ctx.json(true));
      } else {
        return res(ctx.status(404, 'Product not found'));
      }
    }
  ),
];

const productsServer = setupServer(...handlers);

export default productsServer;
