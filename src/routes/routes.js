/** @format */

const controllers = require('../controllers/controllers');

async function routes(app, opts) {
  app.route({
    method: 'GET',
    url: '/orders',
    handler: controllers.getAllOrders,
  });

  app.route({
    method: 'GET',
    url: '/orders/:id',
    handler: controllers.getOrderById,
  });

  app.route({
    method: 'GET',
    url: '/orders/filter',
    handler: controllers.searchOrdersByName,
  });

  app.route({
    method: 'POST',
    url: '/orders',
    handler: controllers.addOrder,
  });

  app.route({
    method: 'PATCH',
    url: '/orders/:id',
    handler: controllers.updateOrder,
  });
}

module.exports = routes;
