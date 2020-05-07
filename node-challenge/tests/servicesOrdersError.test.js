const ordersServices = require('../services/orders');

const id = '123fgh454';
const mockDataOrders = 'Error getting orders';
const mockDataOrder = 'Error getting orders';
const mockAdd = 'Error adding order';
const mockUpdate = 'Error updating order';

jest.mock('../services/firebase', () => {
  return {
    collection: jest.fn(col => ({
      get: jest.fn(() => Promise.reject(mockDataOrders)),
      add: jest.fn(() => Promise.reject(mockAdd)),
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.reject(mockDataOrder)),
        update: jest.fn(() => Promise.reject(mockUpdate))
      }))
    })),
  };
});

test('getOrders should return error when firebase fails', async () => {
  const res = await ordersServices.getOrders();

  expect(res.error).toEqual(mockDataOrders);
});

test('getOrderById should return error when firebase fails', async () => {
  const res = await ordersServices.getOrderById(id);

  expect(res.error).toEqual(mockDataOrder);
});

test('postOrder should return error when firebase fails', async () => {
  const res = await ordersServices.postOrder();

  expect(res.error).toEqual(mockAdd);
});

test('putOrder should return error when firebase fails', async () => {
  const res = await ordersServices.putOrder(id);

  expect(res.error).toEqual(mockUpdate);
});