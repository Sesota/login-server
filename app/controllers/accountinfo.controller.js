const db = require("../models");
const AccountInfo = db.AccountInfo;
const Account = db.Account;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  var id;
  // Find the target account
  Account.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found",
        });
      } else {
        id = account.id;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  // Create an Account Info record
  const accountinfo = {
    fname: req.body.fname,
    lname: req.body.lname,
    linkedin: req.body.linkedin,
    twitter: req.body.twitter,
    accountId: id,
  };

  // Save Account Info in the database
  AccountInfo.create(accountinfo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Account Info",
      });
    });
};

exports.findOne = (req, res) => {
  var id;
  // Find the target account
  Account.findOne({
    where: {
      username: req.query.username,
    },
  })
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found",
        });
      }
      id = account.id;
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  // Search for the account info
  AccountInfo.findOne({
    where: {
      accountId: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving accountinfo with accountid = " + id,
      });
    });
};
