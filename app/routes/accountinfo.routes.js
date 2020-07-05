module.exports = (app) => {
  const accountinfo = require("../controllers/accountinfo.controller");
  var router = require("express").Router();

  // Create a new account
  router.post("/", accountinfo.create);

  // Retrieve a single account with id
  router.get("/", accountinfo.findOne);

  app.use("/api/accountinfo", router);
};
