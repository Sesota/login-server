const db = require("../models");
const AccountInfo = db.AccountInfo;
const Account = db.Account;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // var id;
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
      }
      // Create an Account Info record
      const accountinfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter,
        accountId: account.id,
      };

      // Save Account Info in the database
      AccountInfo.create(accountinfo)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occured while creating the Account Info",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (req, res) => {
  const username = req.params.username;

  // Find the target account
  Account.findOne({
    where: {
      username: username,
    },
  })
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found",
        });
      }
      // Search for the account info
      AccountInfo.findOne({
        where: {
          accountId: account.id,
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
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const username = req.params.username;

  // Find the target account
  Account.findOne({
    where: {
      username: username,
    },
  })
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found",
        });
      }
      // Update
      AccountInfo.update(req.body, {
        where: { accountId: account.id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "AccountInfo was updated successfully.",
            });
          } else {
            res.send({
              message: `Cannot update Account Info for username=${username}. Maybe Account Info was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Account Info for username=" + username,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
