const { LoginType } = require("../config/auth");
const { ResponseUtility, StatusCode } = require("../utils/utils");

class AuthMiddleware {
  static verifyAuthToken(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return ResponseUtility.failed({
        res: res,
        message: "Unauthorized",
        code: 401,
      });
    }

    try {
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = { id: decodedToken.id, email: decodedToken.email };
      next();
    } catch (error) {
      return ResponseUtility.failed({
        res: res,
        message: "Unauthorized",
        code: StatusCode.unAuthorized,
      });
    }
  }

  static validateLoginType(req, res, next) {
    var loginType = req.body.loginType;

    if (!loginType) {
      return ResponseUtility.failed({
        res: res,
        message: "loginType is required",
        code: StatusCode.badRequest,
      });
    }
    if (
      ![LoginType.email, LoginType.google, LoginType.phone].includes(loginType)
    ) {
      return ResponseUtility.failed({
        res: res,
        message: "Invalid loginType",
        code: StatusCode.badRequest,
      });
    }

    next();
  }
}

module.exports.AuthMiddleware = AuthMiddleware;
