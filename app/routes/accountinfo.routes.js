module.exports = (app) => {
  const accountinfo = require("../controllers/accountinfo.controller");
  var router = require("express").Router();

  // Create account info
  router.post("/", accountinfo.create);

  // Retrieve account info
  router.get("/", accountinfo.findOne);

  // Update account info
  router.put("/:username", accountinfo.update);

  app.use("/api/accountinfo", router);
};
