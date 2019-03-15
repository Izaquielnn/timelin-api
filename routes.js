const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');

routes.post('/users', userController.store);

module.exports = routes;