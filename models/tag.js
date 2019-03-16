const db = require('../config/database');
const Sequelize = require('sequelize');
const User = require('./user');

const Tag = db.define('Tag', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: '#fff'
    },
});

User.hasMany(Tag);

module.exports = Tag;