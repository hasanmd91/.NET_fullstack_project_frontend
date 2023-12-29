import { createStore } from '../../redux/store';
import server, { access_token } from '../server/userServer';
import {
  authenticateUserAsync,
  createNewUserAsync,
  getAllUsersAsync,
  loginUserAsync,
  updateUserAsync,
} from '../../redux/thunks/userThunk';
import usersData from '../Data/userData';

let store = createStore();
beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Test authintication', () => {
  test('A user should login with correct email and password', async () => {
    await store.dispatch(
      loginUserAsync({
        email: 'John@gmail.com',
        password: 'nokia6300',
      })
    );
    expect(store.getState().user.currentUser.email).toBe('John@gmail.com');
  });

  test('Should authenticate with right token', async () => {
    await store.dispatch(
      authenticateUserAsync(
        access_token + '_9ea4cb6f-5f1a-4baa-b9ed-ebda5ec7520f'
      )
    );
    expect(store.getState().user.currentUser).toMatchObject(usersData[0]);
  });
});

describe('Test usersReducer async actions', () => {
  test('Should fetch all users', async () => {
    await store.dispatch(getAllUsersAsync());
    expect(store.getState().user.users.length).toBe(2);
  });

  test('Should create a new user', async () => {
    const newUser = {
      firstName: 'ilhaan',
      lastName: 'hasan',
      email: 'hasssan@email.com',
      password: 'nokia6300',
      avatar:
        'https://assets-prd.ignimgs.com/2022/11/22/avatar-blogroll2-1669090391194.jpg',
      address: 'otavantie 20 a 15',
      zip: '01xa550',
      city: 'vantxaa',
    };

    await store.dispatch(createNewUserAsync(newUser));
    expect(store.getState().user.users.length).toBe(1);
    expect(store.getState().user.users[0].firstName).toBe('ilhaan');
    expect(store.getState().user.users[0].email).toBe('hasssan@email.com');
    expect(store.getState().user.users[0].password).toBe('nokia6300');
  });

  test('Should update a existing user', async () => {
    await store.dispatch(getAllUsersAsync());
    const updateUserData = {
      firstName: 'ron',
      lastName: 'edge',
      email: 'hasssan@email.com',
      password: 'nokia6300',
      avatar:
        'https://assets-prd.ignimgs.com/2022/11/22/avatar-blogroll2-1669090391194.jpg',
      address: 'otavantie 20 a 15',
      zip: '01xa550',
      city: 'vantxaa',
    };
    await store.dispatch(
      updateUserAsync({ data: updateUserData, id: usersData[0].id })
    );
    expect(store.getState().user.users[0].firstName).toBe('ron');
  });
});
