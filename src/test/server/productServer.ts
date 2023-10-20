import { rest } from 'msw';
import { setupServer } from 'msw/node';
import productsData from '../data/productsData';
import categoriesData from '../data/categoriesData';
import { NewProduct, product } from '../../types/product';
import { category } from '../../types/category';

export const handlers = [
  // get a product by search query

  rest.get(
    `https://api.escuelajs.co/api/v1/products`,
    async (req, res, ctx) => {
      const searchParam = req.url.searchParams.get('title');
      if (searchParam) {
        const products = productsData.filter(
          (product) => product.title === searchParam
        );
        if (products) {
          return res(ctx.json(products));
        }
        return res(ctx.status(404));
      }
    }
  ),

  rest.get(
    `https://api.escuelajs.co/api/v1/products`,
    async (req, res, ctx) => {
      try {
        return res(ctx.json(productsData));
      } catch (error) {
        return res(ctx.json('internal server error'));
      }
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
      return res(ctx.status(404, 'no product found'));
    }
  ),

  rest.post(
    `https://api.escuelajs.co/api/v1/products`,
    async (req, res, ctx) => {
      const input: NewProduct = await req.json();
      const category: category | undefined = categoriesData.find(
        (c) => c.id === input.categoryId
      );

      if (category) {
        const NewProduct: product = {
          id: productsData.length + 1,
          images: input.images,
          title: input.title,
          description: input.description,
          category,
          price: input.price,
        };

        productsData.push(NewProduct);
        return res(ctx.json(NewProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: ['ivalid input or missing data'],
          error: 'Bad Request',
          statusCode: 400,
        });
      }
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
