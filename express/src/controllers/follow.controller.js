const db = require("../database");

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const followerId = req.params.followerId;
    const followingId = req.params.followingId;

    const follow = await db.follow.create({
      followerId,
      followingId,
    });
    console.log(`Attempting to follow user ${followingId} by user ${followerId}`);

    res.json(follow);
  } catch (error) {
    console.error("Error in followUser:", error);
    res.status(500).json({ error: "Failed to follow user" });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.params.followerId;
    const followingId = req.params.followingId;

    const follow = await db.follow.findOne({
      where: {
        followerId,
        followingId,
      },
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }

    await follow.destroy();

    res.json({ message: "Unfollowed user successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to unfollow user" });
  }
};
// Get following status for a specific user
exports.getFollowingStatus = async (req, res) => {
    try {
      const userId = req.params.id;
      const followedUsers = await db.follow.findAll({
        where: { followerId: userId },
        attributes: ['followingId'],
      });
  
      const followingIds = followedUsers.map(follow => follow.followingId);
  
      res.json({ followingIds });
    } catch (error) {
      console.error("Error in getFollowingStatus:", error);
      res.status(500).json({ error: "Failed to get following status" });
    }
  };