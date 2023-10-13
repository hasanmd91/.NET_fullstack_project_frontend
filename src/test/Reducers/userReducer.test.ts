import {
  createNewUserAsync,
  getAUsersAsync,
  getAllUsersAsync,
  updateUserAsync,
} from '../../redux/methods/userMethod';
import { createStore } from '../../redux/store';
import usersData from '../Data/userData';
import server from '../server/userServer';

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

  test('Should get a user by id', async () => {
    await store.dispatch(getAUsersAsync(usersData[0].id));
    expect(store.getState().user.currentUser.id).toBe(usersData[0].id);

    await store.dispatch(getAUsersAsync(usersData[1].id));
    expect(store.getState().user.currentUser.id).toBe(usersData[1].id);
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

  test('Should update a new user', async () => {
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
