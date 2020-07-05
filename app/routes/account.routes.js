module.exports = app => {
  const accounts = require("../controllers/account.controller");
  var router = require("express").Router();

  // Create a new account
  router.post("/", accounts.create);

  // Retrieve all accounts
  router.get("/", accounts.findAll);

  // Retrieve a single account with id
  router.get("/:id", accounts.findOne);

  // Delete an account with id
  router.delete("/:id", accounts.delete);
  
  app.use('/api/accounts', router);
};