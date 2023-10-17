import { rest } from 'msw';
import { setupServer } from 'msw/node';
import categoriesData from '../data/categoriesData';

export const handlers = [
  rest.get(
    `https://api.escuelajs.co/api/v1/categories`,
    async (req, res, ctx) => {
      return res(ctx.json(categoriesData));
    }
  ),

  rest.get(
    `https://api.escuelajs.co/api/v1/categories/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const category = categoriesData.find(
        (category) => category.id === Number(id)
      );
      if (category) {
        return res(ctx.json(category));
      }
    }
  ),

  rest.post(
    `https://api.escuelajs.co/api/v1/categories`,
    async (req, res, ctx) => {
      const category = await req.json();
      categoriesData.push(category);
      return res(ctx.json(category));
    }
  ),

  rest.put(
    `https://api.escuelajs.co/api/v1/categories/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const updatedData = await req.json();
      const categoryIndex = categoriesData.findIndex(
        (category) => category.id === Number(id)
      );

      if (categoryIndex === -1) {
        return res(ctx.status(404), ctx.json({ error: 'category not found' }));
      }

      categoriesData[categoryIndex] = {
        ...categoriesData[categoryIndex],
        ...updatedData,
      };
      return res(ctx.json(categoriesData[categoryIndex]));
    }
  ),

  rest.delete(
    `https://api.escuelajs.co/api/v1/categories/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;

      const category = categoriesData.filter(
        (category) => category.id !== Number(id)
      );
      if (category) {
        return res(ctx.json(true));
      } else {
        return res(ctx.status(404, 'Product not found'));
      }
    }
  ),
];

const categoryServer = setupServer(...handlers);

export default categoryServer;
