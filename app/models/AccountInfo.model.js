module.exports = (sequelize, Sequelize) => {
  const AccountInfo = sequelize.define("AccountInfo", {
    fname: { type: Sequelize.STRING },
    lname: { type: Sequelize.STRING },
    linkedin: { type: Sequelize.STRING },
    twitter: { type: Sequelize.STRING },
    accountId: { type: Sequelize.INTEGER },
  });

  AccountInfo.associate = function (models) {
    AccountInfo.belongsTo(models.Account, {
      foreignKey: "accountId",
      as: "account",
    });
  };

  return AccountInfo;
};
