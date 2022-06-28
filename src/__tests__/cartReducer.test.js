import { ACTIONS, cartReducer } from '../context/CartContext';

describe('Adding an item:', () => {
  it('adds a new item correctly', () => {
    const state = {
      cart: [],
      totalAmount: 0,
      numberOfItems: 0,
    };

    const action = {
      type: ACTIONS.ADD_ITEM,
      payload: {
        newItem: {
          id: 1,
          name: 'test item name',
          price: 10,
        },
      },
    };

    const cart = cartReducer(state, action);
    expect(cart).toEqual({
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 1,
        },
      ],
      totalAmount: 1000,
      numberOfItems: 1,
    });
  });

  it('adds an already existing item correctly', () => {
    const state = {
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 5,
        },
      ],
      totalAmount: 5000,
      numberOfItems: 5,
    };

    const action = {
      type: ACTIONS.ADD_ITEM,
      payload: {
        newItem: {
          id: 1,
          name: 'test item name',
          price: 10,
        },
      },
    };

    const cart = cartReducer(state, action);
    expect(cart).toEqual({
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 6,
        },
      ],
      totalAmount: 6000,
      numberOfItems: 6,
    });
  });
});

describe('Removing an item:', () => {
  it('reduces the quantity of an item correctly', () => {
    const state = {
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 5,
        },
      ],
      totalAmount: 5000,
      numberOfItems: 5,
    };

    const action = {
      type: ACTIONS.REMOVE_ITEM,
      payload: {
        id: 1,
        price: 10,
      },
    };

    const cart = cartReducer(state, action);
    expect(cart).toEqual({
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 4,
        },
      ],
      totalAmount: 4000,
      numberOfItems: 4,
    });
  });

  it('removes an item completely when the quantity is 0', () => {
    const state = {
      cart: [
        {
          id: 1,
          name: 'test item name',
          price: 10,
          quantity: 1,
        },
      ],
      totalAmount: 1000,
      numberOfItems: 1,
    };

    const action = {
      type: ACTIONS.REMOVE_ITEM,
      payload: {
        id: 1,
        price: 10,
      },
    };

    const cart = cartReducer(state, action);
    expect(cart).toEqual({
      cart: [],
      totalAmount: 0,
      numberOfItems: 0,
    });
  });
});
