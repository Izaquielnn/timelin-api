const db = require('../config/database');
const Sequelize = require('sequelize');

const User = db.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 50],
                msg: 'Nome deve possuir entre 3 e 50 caracteres'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email deve ser válido. ex: exemplo@email.com'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [5, 50],
                msg: 'Senha deve possuir entre 5 e 50 caracteres'
            }
        }
    },
});

module.exports = User;