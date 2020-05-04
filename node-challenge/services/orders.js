const db = require('./firebase');

const getOrders = () => {
  return db.collection('orders').get()
  .then(snapshot => {
    let response = [];

    snapshot.forEach(order => {
      response.push({
        'id': order.id,
        'order': order.data()
      });
    });
    
    return response;
  })
  .catch((err) => {
    console.log('Error getting orders', err);
    return { error: err };
  });
}

const getOrderById = id => {
  return db.collection('orders').doc(id).get()
  .then(order => {
    if (!order.exists) {
      return { error: 'Order does not exist' };
    } else {
      return order.data();
    }
  })
  .catch(err => {
    console.log('Error getting order ', id, ' err: ', err);
    return { error: err };
  });
}

const postOrder = order => {
  return db.collection('orders').add(order)
  .then(ref => {
    console.log('Added order with ID: ', ref.id);
    return { id: ref.id }
  })
  .catch(err => {
    console.log('Error posting order, err: ', err);
    return { error: err };
  });
}

module.exports = { 
  getOrders: getOrders,
  getOrderById: getOrderById,
  postOrder: postOrder
};