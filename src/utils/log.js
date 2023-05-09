class LogUtility {
  static log(position, err, docs) {
    if (err) {
      this.error(position, err);
    } else {
      this.info(position, docs);
    }
  }

  static info(position, message) {
    console.info(
      `\u001b[1;35m[INFO] (${position}) ${JSON.stringify(message)}\u001b[0m`
    );
  }

  static success(position, message) {
    console.log(`\u001b[1;32m[SUCCESS] (${position}) ${message}\u001b[0m`);
  }

  static error(position, message) {
    console.error(
      `\u001b[1;31m[ERROR] (${position}) ${JSON.stringify(message)}\u001b[0m`
    );
    // console.error(`\u001b[1;31m[ERROR] (${position}) ${message}\u001b[0m`);
  }
}

module.exports.LogUtility = LogUtility;
