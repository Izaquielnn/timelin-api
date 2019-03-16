const express = require('express');
const auth = require('./middleware/auth');

const routes = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const eventController = require('./controllers/eventController');
const tagController = require('./controllers/tagController');

routes.post('/login', authController.login);

routes.post('/users', userController.store);
routes.get('/users/me', auth, userController.getCurrentUser);
routes.put('/users/me', auth, userController.update);

routes.post('/events', auth, eventController.store);
routes.get('/events', auth, eventController.index);
routes.put('/events/:id', auth, eventController.update);

routes.post('/tags', auth, tagController.store);
routes.get('/tags', auth, tagController.index);
routes.put('/tags/:id', auth, tagController.update);
routes.delete('/tags/:id', auth, tagController.delete);

module.exports = routes;