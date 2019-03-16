const express = require('express');
const auth = require('./middleware/auth');

const routes = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

routes.post('/login', authController.login);
routes.get('/users/me', auth, userController.getCurrentUser);
routes.post('/users', userController.store);

module.exports = routes;