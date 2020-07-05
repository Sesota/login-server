module.exports = (app) => {
  const friendships = require("../controllers/friendshiprelation.controller");
  var router = require("express").Router();

  // Add a friendship relation with ids
  router.post("/friends", friendships.addFriend);

  // Get an account's friends list with id
  router.get("/friends/:id", friendships.getFriends);

  app.use("/api/accounts", router);
};
