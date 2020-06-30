const dotenv = require('dotenv');
dotenv.config();
const config = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'mathematics_development',
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: '0',
    },
    production: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'mathematics_production',
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: '0',
    },
};
module.exports = config;
