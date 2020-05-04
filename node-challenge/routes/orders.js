var express = require('express');
var router = express.Router();
var ordersService = require('../services/orders');

router.get('/', async function(req, res, next) {

  const orders = await ordersService.getOrders();

  if(!orders.error)
    res.send({ orders });
});

router.get('/:id', async function(req, res, next) {

  const order = await ordersService.getOrderById(req.params.id);

  if(!order.error)
    res.send({ order });

  if(order.error === 'Order does not exist')
    res.status(404).send(order);
});

router.post('/', async function(req, res, next) {
  const response = await ordersService.postOrder(req.body);

  if(!response.error)
    res.status(200).send();

  if(response.error)
    res.status(500).send();
});

module.exports = router;