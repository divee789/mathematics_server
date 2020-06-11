const config = {
  development: {
    username: 'root',
    password: '123456789',
    database: 'mathematics_development',
    host: 'localhost',
    dialect: 'mysql',
    // operatorsAliases: '0',
    // migrationStorage: 'sequelize',
    // migrationStorageTableName: 'sequelize_migration',
    // logging: true,
    // pool: {
    //   max: 15,
    //   min: 0,
    //   idle: 10000,
    // },
  },
  production: {
    username: 'root',
    password: '123456789',
    database: 'mathematics_production',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: '0',
  },
};

module.exports = config;
