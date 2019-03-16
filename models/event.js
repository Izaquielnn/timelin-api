const db = require('../config/database');
const Sequelize = require('sequelize');
const User = require('./user');

const Event = db.define('Event', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },

    date: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: '#fff'
    },
});

User.hasMany(Event);

module.exports = Event;