const { Router } = require('express');

const loginController = require('../controllers/login');

const routes = Router();

routes.get('/', (req, res) => {
  res.json({
    message: 'Hello!',
  });
});

routes.post('/login', loginController);

module.exports = routes;