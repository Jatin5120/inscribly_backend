const { User } = require("../models/user");

class UserController {
  static async checkUser(email, phone) {
    var userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });
    return userExists;
  }
}

module.exports.UserController = UserController;
