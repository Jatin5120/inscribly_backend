require("dotenv/config");

module.exports.DatabaseConfig = {
  dbUrl:
    process.env.NODE_ENV == "dev"
      ? process.env.MONGO_DB_URL_DEV
      : process.env.MONGO_DB_URL_PROD,
  port: process.env.PORT,
};
