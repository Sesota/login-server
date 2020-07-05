const db = require("../models");
const Account = db.Account;
const AccountInfo = db.AccountInfo;
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
    .then((data1) => {
      // res.send(data);  // The code is commented because the data is sent to the client after creating the account info

      // Create an Account Info record for the new Account
      const accountinfo = {
        accountId: data1.id,
      };

      // Save Account Info in the database
      AccountInfo.create(accountinfo)
        .then((data2) => {
          res.send(data2); // How to merge data1 and data2 to output to the client?
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Account has been saved but creating Account Info failed",
          });
        });
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
