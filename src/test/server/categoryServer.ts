import { rest } from 'msw';
import { setupServer } from 'msw/node';
import categoriesData from '../Data/categoriesData';

export const handlers = [
  rest.get(`http://localhost:5137/api/category/`, async (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),

  rest.get(`http://localhost:5137/api/category/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const category = categoriesData.find((category) => category.id === id);
    if (category) {
      return res(ctx.json(category));
    }
  }),

  rest.post(`http://localhost:5137/api/category/`, async (req, res, ctx) => {
    const category = await req.json();

    const existingCategory = categoriesData.find(
      (cat) => cat.name === category.name
    );

    if (existingCategory) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Category with the same name already exists' })
      );
    }

    const newCategory = {
      id: (categoriesData.length + 1).toString(),
      name: category.name,
    };

    categoriesData.push(newCategory);
    return res(ctx.json(newCategory));
  }),

  rest.patch(
    `http://localhost:5137/api/category/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const updatedData = await req.json();
      const categoryIndex = categoriesData.findIndex(
        (category) => category.id === id
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
    `http://localhost:5137/api/category/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;

      const category = categoriesData.filter((category) => category.id !== id);
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
