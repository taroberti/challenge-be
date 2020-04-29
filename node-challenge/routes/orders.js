var express = require('express');
var router = express.Router();
var ordersService = require('../services/orders');

router.get('/', async function(req, res, next) {

  const response = await ordersService.getOrders();

  if(!response.error)
    res.send(response);
});

router.get('/:id', async function(req, res, next) {

  const response = await ordersService.getOrderById(req.params.id);

  if(!response.error)
    res.send(response);

  if(response.error === 'Order does not exist')
    res.status(404).send(response);
});

module.exports = router;