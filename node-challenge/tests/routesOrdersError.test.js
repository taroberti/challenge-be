const request = require('supertest');
const app = require('../app');

const mockError = { error: 'error' };
const mockErrorOrder = { error: 'Order does not exist' };


jest.mock('../services/orders', () => {
  return {
    __esModule: true,
    getOrders: jest.fn(() => mockError),
    getOrderById: jest.fn(() => mockErrorOrder),
    postOrder: jest.fn(() => mockError),
    putOrder: jest.fn(() => mockError)
  };
});

test('get /orders should return an error', async () => {
  const res = await request(app).get('/orders');

  expect(res.statusCode).toEqual(500);
  expect(res.body).toEqual(mockError);
});

test('get /orders/:id should return an error', async () => {
  const res = await request(app).get('/orders/123nmk765');

  expect(res.statusCode).toEqual(404);
  expect(res.body).toEqual(mockErrorOrder);
});

test('post /orders should return an error', async () => {
  const res = await request(app).post('/orders');

  expect(res.statusCode).toEqual(500);
  expect(res.body).toEqual(mockError);
});

test('put /orders/:id should return an error', async () => {
  const res = await request(app).put('/orders/123nmk765');

  expect(res.statusCode).toEqual(500);
  expect(res.body).toEqual(mockError);
});