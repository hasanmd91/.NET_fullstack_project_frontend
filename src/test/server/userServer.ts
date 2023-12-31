import { rest } from 'msw';
import { setupServer } from 'msw/node';
import usersData from '../Data/userData';

export const access_token = 'my-access-token';

export const handlers = [
  rest.post(
    'https://ecommershop.azurewebsites.net/api/auth/login',
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const token = access_token + '_' + foundUser.id;
        return res(ctx.json(token));
      } else {
        ctx.status(401);
        return res(ctx.text('Cannot authenticate user'));
      }
    }
  ),

  rest.get(
    'https://ecommershop.azurewebsites.net/api/auth/profile',
    (req, res, ctx) => {
      const token = req.headers.get('Authorization')?.split(' ')[1];
      const originalToken = token?.split('_')[0];
      const userId = token?.split('_')[1];
      const user = usersData.find((u) => u.id === userId);
      if (originalToken === access_token && user) {
        return res(ctx.json(user));
      } else {
        ctx.status(401);
        return res(ctx.text('Cannot authenticate user'));
      }
    }
  ),

  rest.get(
    'https://ecommershop.azurewebsites.net/api/user/',
    (req, res, ctx) => {
      return res(ctx.json(usersData));
    }
  ),

  rest.post(
    'https://ecommershop.azurewebsites.net/api/user/',
    async (req, res, ctx) => {
      const newUser = await req.json();

      if (newUser) {
        usersData.push(newUser);
        return res(ctx.json(newUser));
      } else {
        return res(
          ctx.status(400),
          ctx.json({ error: 'User can not be created' })
        );
      }
    }
  ),
  rest.patch(
    'https://ecommershop.azurewebsites.net/api/user/:id',
    async (req, res, ctx) => {
      const { id } = req.params;
      const userId = id;
      const updateData = await req.json();

      const userIndex = usersData.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        usersData[userIndex] = {
          ...usersData[userIndex],
          ...updateData,
        };

        return res(ctx.json(usersData[userIndex]));
      } else {
        return res(ctx.status(404), ctx.json({ error: 'User is not found' }));
      }
    }
  ),
];
const userServer = setupServer(...handlers);
export default userServer;
