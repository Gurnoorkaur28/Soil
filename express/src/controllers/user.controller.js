// Some Code/concept taken from RMIT - COSC2758 Wk8 Lec Code - Example 3
const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Select user from database where username & password match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a new user in the db.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    full_name: req.body.fullName,
  });

  res.json(user);
};
