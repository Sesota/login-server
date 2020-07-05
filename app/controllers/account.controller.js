const db = require("../models");
const Account = db.Account;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validiate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Username can not be empty!",
    });
    return;
  }

  // Create an account
  const account = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  // Save Account in the database
  Account.create(account)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Account",
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  Account.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving accounts",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Account.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving account with id = " + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Account.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Account was deleted successfully",
        });
      } else {
        res.send({
          message:
            "Cannot delete account with id = ${id}. Maybe account was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete account with id = " + id,
      });
    });
};
