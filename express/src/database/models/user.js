// Code/concept taken from RMIT - COSC2758 Wk8 Lec Code - Example 3
const {
  EMAILREGEX,
  MINONECHARUPPER,
  MINONECHARLOWER,
  MINONECHARSPECIAL,
  MINONENUMBER,
  NAMEREGEX,
} = require("../../utils/constants");
const argon2 = require("argon2");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        validate: {
          is: {
            args: EMAILREGEX,
            msg: "Invalid Email",
          },
        },
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
        validate: {
          isStrong(value) {
            if (!value) {
              throw new Error("Password cannot be null");
            }
            if (value.length < 8) {
              throw new Error("Password must be at least 8 characters long");
            }
            if (!MINONECHARUPPER.test(value)) {
              throw new Error(
                "Password must contain at least one uppercase letter"
              );
            }
            if (!MINONECHARLOWER.test(value)) {
              throw new Error(
                "Password must contain at least one lowercase letter"
              );
            }
            if (!MINONENUMBER.test(value)) {
              throw new Error("Password must contain at least one number");
            }
            if (!MINONECHARSPECIAL.test(value)) {
              throw new Error(
                "Password must contain at least one special character"
              );
            }
          },
        },
      },
      full_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          len: {
            args: [1, 30],
            msg: "Name must be b/w 1-30 characters",
          },
          is: {
            args: NAMEREGEX,
            msg: "Name must only contain letters",
          },
        },
      },
      join_date: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password_hash) {
            user.password_hash = await argon2.hash(user.password_hash, {
              type: argon2.argon2id,
            });
          }
        },
      },
      timestamps: false,
    }
  );
