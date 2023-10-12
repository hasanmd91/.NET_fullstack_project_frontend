import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { allProductsMockData } from '../../utils/MockTestData';
import { newProduct, updatedProduct } from '../../types/product';

const handler = [
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) => {
    return res(ctx.json(allProductsMockData));
  }),

  rest.post(
    'https://api.escuelajs.co/api/v1/products',
    async (req, res, ctx) => {
      const product: newProduct = await req.json();
      return res(ctx.json(product));
    }
  ),
  rest.put(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const updateProduct: updatedProduct = await req.json();
      const { id } = req.params;
      const foundProduct = allProductsMockData.find(
        (product) => product.id === Number(id)
      );
      if (foundProduct) {
        return res(
          ctx.json({
            ...foundProduct,
            ...updateProduct,
          })
        );
      }
      return res(ctx.status(404, 'Product is not found'));
    }
  ),

  rest.delete(
    'https://api.escuelajs.co/api/v1/products/:id',
    async (req, res, ctx) => {
      const { id } = req.params;

      const foundProduct = allProductsMockData.find(
        (product) => product.id === Number(id)
      );
      if (foundProduct) {
        return res(ctx.json(true));
      }
      return res(ctx.status(404, 'Product is not found'));
    }
  ),
];

const productServer = setupServer(...handler);
export default productServer;
