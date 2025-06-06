// Some Code/concept taken from RMIT - COSC2758 Wk8 Lec Code - Example 3
const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Select one user from the database.
exports.one = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Gets user ID from database using email.
exports.id = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });
    if (user) {
      res.json({ userId: user.id });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user ID" });
  }
};

// Select user from database where username & password match.
exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });
    if (
      user === null ||
      !(await argon2.verify(user.password_hash, req.query.password))
    ) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

// Create a new user in the db.
exports.create = async (req, res) => {
  try {
    const lowerCaseEmail = req.body.email.toLowerCase();
    const user = await db.user.create({
      email: lowerCaseEmail,
      password_hash: req.body.password,
      full_name: req.body.fullName,
      join_date: new Date().toISOString(),
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      res
        .status(500)
        .json({ error: `Failed to create user: ${error.message}` });
    }
  }
};

// Update an existing user in the db.
exports.update = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates = req.body;

    // Update the user with the new data
    await user.update(updates, { fields: Object.keys(updates) });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      res
        .status(500)
        .json({ error: `Failed to update user: ${error.message}` });
    }
  }
};

// Delete a user from the db.
exports.remove = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete user: ${error.message}` });
  }
};
