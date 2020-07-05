module.exports = (sequelize, Sequelize) => {
  const FriendshipRelation = sequelize.define("FriendshipRelation", {
    masterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    slaveId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  FriendshipRelation.associate = function (models) {
    FriendshipRelation.belongsTo(models.Users, {
      as: "Parent",
      onDelete: "CASCADE",
    });
    FriendshipRelation.belongsTo(models.Users, {
      as: "Sibling",
      onDelete: "CASCADE",
    });
  };

  return FriendshipRelation;
};
