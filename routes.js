const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

routes.post('/login', authController.login);
routes.post('/users', userController.store);

module.exports = routes;