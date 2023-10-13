import { rest } from 'msw';
import { setupServer } from 'msw/node';
import usersData from '../Data/userData';
export const access_token = 'my-access-token';
export const handlers = [
  rest.get('https://api.escuelajs.co/api/v1/users', (req, res, ctx) => {
    return res(ctx.json(usersData));
  }),

  rest.get('https://api.escuelajs.co/api/v1/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    const user = usersData.find((user) => user.id === userId);
    if (user) {
      return res(ctx.json(user));
    }
  }),

  rest.post('https://api.escuelajs.co/api/v1/users', async (req, res, ctx) => {
    const newUser = await req.json();
    return res(ctx.json(newUser));
  }),

  rest.put(
    'https://api.escuelajs.co/api/v1/users/:id',
    async (req, res, ctx) => {
      const { id } = req.params;
      const userId = Number(id);
      const updateData = await req.json();

      const userIndex = usersData.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        usersData[userIndex] = {
          ...usersData[userIndex],
          ...updateData,
        };

        return res(ctx.json(usersData[userIndex]));
      } else {
        return res(ctx.status(404), ctx.json({ error: 'User not found' }));
      }
    }
  ),
];
const userServer = setupServer(...handlers);
export default userServer;
