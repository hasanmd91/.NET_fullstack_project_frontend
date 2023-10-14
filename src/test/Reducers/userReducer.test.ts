import { createStore } from '../../redux/store';
import usersData from '../data/userData';
import server, { access_token } from '../server/userServer';
import {
  authenticateUserAsync,
  createNewUserAsync,
  getAllUsersAsync,
  loginUserAsync,
  updateUserAsync,
} from '../../redux/thunks/userThunk';

let store = createStore();
beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Test usersReducer async actions', () => {
  test('Should fetch all users', async () => {
    await store.dispatch(getAllUsersAsync());
    expect(store.getState().user.users.length).toBe(3);
  });

  test('Should create a new user', async () => {
    const newUser = {
      name: 'Maria',
      email: 'maria@mail.com',
      password: '12345',
      confirmPassword: '12345',
      avatar: 'https://picsum.photos/640/640?r=9443',
    };

    await store.dispatch(createNewUserAsync(newUser));
    expect(store.getState().user.users.length).toBe(1);
    expect(store.getState().user.users[0].name).toBe('Maria');
    expect(store.getState().user.users[0].email).toBe('maria@mail.com');
    expect(store.getState().user.users[0].password).toBe('12345');
  });

  test('Should authenticate witg right token', async () => {
    await store.dispatch(authenticateUserAsync(access_token + '_2'));
    expect(store.getState().usersReducer.currentUser).toMatchObject(
      usersData[1]
    );
  });

  test('A user should login with correct email and password', async () => {
    await store.dispatch(
      loginUserAsync({
        email: 'john@mail.com',
        password: 'changeme',
      })
    );
    expect(store.getState().user.currentUser.email).toBe('john@mail.com');
  });

  test('Should update a existing user', async () => {
    await store.dispatch(getAllUsersAsync());
    const updateUserData = {
      email: 'jahn@mail.com',
      name: 'ron',
    };
    await store.dispatch(
      updateUserAsync({ data: updateUserData, id: usersData[0].id })
    );
    expect(store.getState().user.users[0].name).toBe('ron');
  });
});
