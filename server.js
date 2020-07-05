var express = require("express");
// var session = require('express-session'); //future
var bodyParser = require("body-parser");
var cors = require("cors");
var db = require("./app/models");

var app = express();

// app.use(session({                          //future
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Login Application" });
});

require("./app/routes/account.routes")(app);
require("./app/routes/friendshiprelation.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/accountinfo.routes")(app);

const PORT = process.env.PORT || 8050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
