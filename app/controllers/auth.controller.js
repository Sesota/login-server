const db = require("../models");
const config = require("../config/auth.config");
const Account = db.Account;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save account to database
  Account.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
  })
    .then((user) => {
      res.send({
        message: "Account was registered successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.signin = (req, res) => {
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
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        account.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: account.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: account.id,
        username: account.username,
        email: account.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
