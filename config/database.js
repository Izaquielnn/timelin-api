const Sequelize = require('sequelize');

const database = 'd3qptjbn4gupcv';
const user = 'gckaxzpylrqxuf';
const password = '5174d36c60c32c3482460a43353ce4c44b4a1dc41d61798422ceaf95740b4952';
const host = 'ec2-50-19-109-120.compute-1.amazonaws.com';
const port = 5432;

module.exports = new Sequelize( database, user, password, {
    host,
    port,
    dialect: 'postgres',
    dialectOptions: { 
        ssl: true 
    }
});