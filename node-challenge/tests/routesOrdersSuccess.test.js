const request = require('supertest');
const app = require('../app');

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

jest.mock('../services/orders', () => {
  return {
    __esModule: true,
    getOrders: jest.fn(() => mockOrders),
    getOrderById: jest.fn(() => mockOrder),
    postOrder: jest.fn(() => mockPost),
    putOrder: jest.fn(() => mockPut)
  };
});

test('get /orders should return the orders', async () => {
  const res = await request(app).get('/orders');

  expect(res.statusCode).toEqual(200);
  expect(res.body.orders).toEqual(mockOrders);
});

test('get /orders/:id should return the order', async () => {
  const res = await request(app).get('/orders/123nmk765');

  expect(res.statusCode).toEqual(200);
  expect(res.body.order).toEqual(mockOrder);
});

test('post /orders should return 200', async () => {
  const res = await request(app).post('/orders');

  expect(res.statusCode).toEqual(200);
});

test('put /orders/:id should return 200', async () => {
  const res = await request(app).put('/orders/123nmk765');

  expect(res.statusCode).toEqual(200);
});