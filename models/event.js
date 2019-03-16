const db = require('../config/database');
const Sequelize = require('sequelize');
const User = require('./user');
const Tag = require('./tag');

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

Event.belongsToMany(Tag, {
    through: 'EventTag',
    as: 'tags',
    foreignKey: 'EventId'
});
Tag.belongsToMany(Event, {
    through: 'EventTag',
    as: 'events',
    foreignKey: 'TagId'
})

User.hasMany(Event);

module.exports = Event;