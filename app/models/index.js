const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.FriendshipRelation = require("./FriendshipRelation.model.js")(
  sequelize,
  Sequelize
);
db.Account = require("./Account.model.js")(sequelize, Sequelize);
db.AccountInfo = require("./AccountInfo.model.js")(sequelize, Sequelize);

module.exports = db;
