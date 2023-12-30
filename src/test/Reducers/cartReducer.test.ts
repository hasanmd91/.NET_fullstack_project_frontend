import cartReducer, {
  addItemToCart,
  cartStateType,
  clearCart,
  removeItemFromCart,
  setItemQuantity,
  totalCartPrice,
} from '../../redux/reducers/cartReducer';
import { createStore } from '../../redux/store';
import cartItemsData from '../Data/cartData';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

describe('Cart Reducer Tests', () => {
  test('Should add an item to the cart', () => {
    const state: cartStateType = {
      cartItems: [],
      totalAmount: 0,
    };

    const item = cartItemsData[0];
    const cartItems = cartReducer(state, addItemToCart(item)).cartItems;
    expect(cartItems[0]).toMatchObject(item);
  });

  test('Should update item quantity and total price for a item', () => {
    const state: cartStateType = {
      cartItems: cartItemsData,
      totalAmount: 0,
    };

    const itemId = cartItemsData[0].id;
    const cartItems = cartReducer(
      state,
      setItemQuantity({ quantity: 5, id: itemId })
    ).cartItems;
    expect(cartItems[0].quantity).toBe(5);
    expect(cartItems[0].totalPrice).toBe(cartItems[0].price * 5);
  });

  test('Should remove an item from the cart', () => {
    const state: cartStateType = {
      cartItems: cartItemsData,
      totalAmount: 0,
    };

    const itemId = cartItemsData[0].id;
    const cartItems = cartReducer(state, removeItemFromCart(itemId)).cartItems;
    expect(cartItems).toHaveLength(3);
  });

  test('Should empty the cart', () => {
    const state: cartStateType = {
      cartItems: cartItemsData,
      totalAmount: 0,
    };
    const cartItems = cartReducer(state, clearCart()).cartItems;
    expect(cartItems).toHaveLength(0);
  });

  test('Should calculate total cart cost correctly', () => {
    const state: cartStateType = {
      cartItems: cartItemsData,
      totalAmount: 0,
    };

    const totalAmount = cartReducer(state, totalCartPrice()).totalAmount;
    expect(totalAmount).toBe(20);
  });
});
