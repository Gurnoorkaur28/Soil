module.exports = (express, app) => {
  const router = express.Router();

  const followController = require("../controllers/follow.controller.js");

  // Follow and unfollow routes
  router.post("/:followerId/:followingId", followController.followUser);
  router.delete("/:followerId/:followingId", followController.unfollowUser);
  //get following status
  router.get("/:id", followController.getFollowingStatus);

  // Add routes to server
  app.use("/api/follow", router);
};
