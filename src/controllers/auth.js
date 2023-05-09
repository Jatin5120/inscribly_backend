const { AuthService } = require("../services/auth");

class AuthController {
  static register = async (req, res) => AuthService.register(req, res);

  static login = async (req, res) => AuthService.login(req, res);
}

module.exports.AuthController = AuthController;
