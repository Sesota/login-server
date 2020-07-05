module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("Account", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: { type: Sequelize.STRING },
  });

  Account.associate = function (models) {
    Account.belongsToMany(models.Account, {
      through: models.FriendshipRelation,
      as: "Master",
      foreignKey: "masterId",
    });
    Account.belongsToMany(model.Account, {
      through: models.FriendshipRelation,
      as: "Slave",
      foreignKey: "slaveId",
    });
  };

  return Account;
};
