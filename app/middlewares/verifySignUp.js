const db = require("../models");
const Account = db.Account;

checkDuplicateUsername = (req, res, next) => {
  Account.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
