import { rest } from 'msw';
import { setupServer } from 'msw/node';
import productsData from '../data/productsData';
import categoriesData from '../data/categoriesData';
import { NewProduct, newProduct, product } from '../../types/product';
import { category, newCategory } from '../../types/category';

export const handlers = [
  // get a product by search query

  rest.get(`http://localhost:5137/api/product`, async (req, res, ctx) => {
    const searchParam = req.url.searchParams.get('Search');
    if (searchParam) {
      const products = productsData.filter(
        (product) => product.title === searchParam
      );
      if (products) {
        return res(ctx.json(products));
      }
      return res(ctx.status(404));
    }
  }),

  // get all product by category query

  rest.get(`http://localhost:5137/api/product`, async (req, res, ctx) => {
    const searchParam = req.url.searchParams.get('CategoryId');
    if (searchParam) {
      const products = productsData.filter(
        (product) => product.categoryId === searchParam
      );
      if (products) {
        return res(ctx.json(products));
      }
      return res(ctx.status(404));
    }
  }),

  rest.get(`http://localhost:5137/api/product`, async (req, res, ctx) => {
    try {
      return res(ctx.json(productsData));
    } catch (error) {
      return res(ctx.json('internal server error'));
    }
  }),

  rest.get(`http://localhost:5137/api/product/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const product = productsData.find((product) => product.id === id);
    if (product) {
      return res(ctx.json(product));
    }
    return res(ctx.status(404, 'no product found'));
  }),

  rest.post(`http://localhost:5137/api/product`, async (req, res, ctx) => {
    const input = await req.json();

    const category = categoriesData.find((c) => c.id === input.categoryId);

    if (!category) {
      return res(
        ctx.status(400),
        ctx.json({
          message: ['Invalid input or missing data'],
          error: 'Bad Request',
          statusCode: 400,
        })
      );
    } else {
      const images = input.images.map((i: string) => ({
        imageUrl: i,
      }));

      const newProduct = {
        id: '5',
        images,
        title: input.title,
        description: input.description,
        categoryId: input.categoryId,
        category: { name: category.name, id: category.id },
        price: input.price,
        quantity: input.quantity,
      };

      productsData.push(newProduct);
      return res(ctx.json(newProduct));
    }
  }),

  rest.patch(`http://localhost:5137/api/product/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();
    const productIndex = productsData.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
    }

    productsData[productIndex] = {
      ...productsData[productIndex],
      ...updatedData,
    };
    return res(ctx.json(productsData[productIndex]));
  }),

  rest.delete(
    `http://localhost:5137/api/product/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const product = productsData.filter((product) => product.id !== id);
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
