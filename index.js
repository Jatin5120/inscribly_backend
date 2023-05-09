const { app } = require("./app");
const mongoose = require("mongoose");
const { DatabaseConfig } = require("./src/config/database");
const { LogUtility } = require("./src/utils/log");

mongoose.set("strictQuery", false);

connectDatabase = async () => {
  LogUtility.info("Connect DB", "Connecting to Database ...");
  mongoose.connect(DatabaseConfig.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};

const main = async () => {
  await connectDatabase().then((db) => {
    db.on("error", function (err) {
      LogUtility.error("Connect DB", `Failed to connect to DB  ${err}`);
      process.exit(1);
    });

    db.once("open", function () {
      LogUtility.success("Connect DB", "Connected to database");
      app.listen(DatabaseConfig.port, () => {
        LogUtility.info(
          "Connect DB",
          `App is running on ${DatabaseConfig.port}`
        );
      });
    });
  });
};

main();
