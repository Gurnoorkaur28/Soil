// Code/concept taken from RMIT - COSC2758 Wk8 Lec Code - Example 3
module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update user.
  router.put("/", controller.update);

  // Delete user.
  router.delete("/", controller.remove);

  // Add routes to server.
  app.use("/api/users", router);
};
