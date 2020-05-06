//const { mockFirebase } = require('firestore-jest-mock');
/*const {
  mockCollection,
  mockGet,
} = require('firestore-jest-mock/mocks/firestore');
*/
const ordersServices = require('../services/orders');
const order1 = {
  id: '123nmk765',
  order: {
    title: 'Test title',
    bookingDate: 0,
    address: {
      street: 'Str 1',
      zip: '1234',
      city: 'Berlin',
      country: 'Germany'
    },
    customer: {
      name: 'Test',
      email: 'test@test.com',
      phone: 12345
    }
  }
};

const order2 = {
  id: '678vsr432',
  order: {
    title: 'Test title 2',
    bookingDate: 0,
    address: {
      street: 'Str 2',
      zip: '1098',
      city: 'Berlin',
      country: 'Germany'
    },
    customer: {
      name: 'Test 2',
      email: 'test2@test.com',
      phone: 76543
    }
  }
};

const mockOrders = {orders: [order1, order2]};
const mockOrder = order1;
const mockPost = { id: '678vsr432' };
const mockPut = { success: 200 };

const data = { data: [order1, order2] };
const mockSnapshot = { val: () => data, exportVal: () => data, exists: jest.fn(() => true) };
/* Tried to use jest.mock here, but would need to mock the snapshot that firebase returned, not so easy.
jest.mock('../services/firebase', () => {
  //const set = jest.fn();
  return {
    collection: jest.fn(col => ({
      get: jest.fn(() => Promise.resolve(mockSnapshot)),
    })),
  };
});
*/

test('getOrders should return the orders from the database', async () => {
  /* Tried to use mockFirebase as well, but getting an error:
  Cannot find module 'firebase' from 'node_modules/firestore-jest-mock/mocks/firebase.js'
  mockFirebase({
    database: {
      orders: [order1, order2]
    }
  });*/

  //const res = await ordersServices.getOrders();
});