const express = require('express');
const auth = require('./middleware/auth');

const routes = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');

routes.post('/login', authController.login);
routes.post('/users', userController.store);
routes.get('/users/me', auth, userController.getCurrentUser);

routes.post('/events', auth, eventController.store);
routes.get('/events', auth, eventController.index);

module.exports = routes;