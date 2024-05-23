// src/middleware/authMiddleware.js

const db = require('../database');

const authenticateUser = async (req, res, next) => {
  const email = req.session.email; // Or from a token
  if (!email) {
    return res.status(401).send('User not authenticated');
  }

  const user = await db.user.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send('User not found');
  }

  req.user = user;
  next();
};

module.exports = authenticateUser;


