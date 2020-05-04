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
    return { id: ref.id }
  })
  .catch(err => {
    console.log('Error posting order, err: ', err);
    return { error: err };
  });
}

const putOrder = (id, order) => {
  return db.collection('orders').doc(id).update(order)
  .then(res => {
    return { success: 200 }
  })
  .catch(err => {
    console.log('Error putting order, err: ', err);
    return { error: err };
  });
}

module.exports = { 
  getOrders: getOrders,
  getOrderById: getOrderById,
  postOrder: postOrder,
  putOrder: putOrder
};