const db = require("../models");
const Friendship = db.FriendshipRelation;

exports.addFriend = (req, res) => {
  //Validiate request
  if (!req.body.masterid || !req.body.slaveid) {
    res.status(400).send({
      message: "Master ID or Slave ID cannot be empty!",
    });
    return;
  }

  // Create a friendship relation
  const friendship = {
    masterId: req.body.masterid,
    slaveId: req.body.slaveid,
  };

  // Save the relationship in the database
  Friendship.create(friendship)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while creating the friendship relation",
      });
    });
};

exports.getFriends = (req, res) => {
  const id = req.params.id;

  Friendship.findAll({ where: { masterId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving friends",
      });
    });
};
