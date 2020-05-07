const ordersServices = require('../services/orders');

const order1 = {
  id: '123nmk765',
  data: () => ({
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
  })
};

const order2 = {
  id: '678vsr432',
  data: () => ({
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
  })
};

const orderById = {
  exists: true,
  id: '678vsr432',
  data: () => ({
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
  })
};

const mockDataOrders = [order1, order2];
const mockDataOrder = orderById;
const mockAdd = { id: '678vsr432' };
const mockUpdate = { success: 200 }

jest.mock('../services/firebase', () => {
  return {
    collection: jest.fn(col => ({
      get: jest.fn(() => Promise.resolve(mockDataOrders)),
      add: jest.fn(() => Promise.resolve(mockAdd)),
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve(mockDataOrder)),
        update: jest.fn(() => Promise.resolve(mockUpdate))
      }))
    })),
  };
});

test('getOrders should return the orders from the database', async () => {
  const res = await ordersServices.getOrders();

  res.forEach((order, index) => {
    expect(order.id).toEqual(mockDataOrders[index].id);
    expect(order.order).toEqual(mockDataOrders[index].data());
  })
});

test('getOrderById should return the order from the database', async () => {
  const res = await ordersServices.getOrderById(orderById.id);

  expect(res).toEqual(mockDataOrder.data());
});

test('postOrder should update the database with the new order', async () => {
  const res = await ordersServices.postOrder();

  expect(res.id).toEqual(mockAdd.id);
});

test('putOrder should update the order in the database', async () => {
  const res = await ordersServices.putOrder(mockAdd.id);

  expect(res.success).toEqual(mockUpdate.success);
});