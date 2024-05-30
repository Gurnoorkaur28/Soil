module.exports = {
  HOST: process.env.SOIL_HOST,
  USER: process.env.SOIL_USER,
  PASSWORD: process.env.SOIL_PASSWORD,
  DB: process.env.SOIL_DB,
  DIALECT: process.env.SOIL_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
