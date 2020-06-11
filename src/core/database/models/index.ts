import dotenv from 'dotenv';

dotenv.config();

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = 'development';
const settings = require('../../../config/config');
const config = settings[env];
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
  host: config.host,
});

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: any): any => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
