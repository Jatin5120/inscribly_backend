const jwt = require("jsonwebtoken");
require("dotenv/config");
const { ResponseUtility, LogUtility } = require("../utils/utils");
const { UserController } = require("../controllers/controllers");
const { StatusCode, LoginType } = require("../config/auth");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const crypto = require("crypto");
const secret = crypto.randomBytes(32).toString("hex");

class AuthService {
  static _generateAuthToken(user) {
    const payload = { id: user._id, email: user.email, phone: user.phone };
    const options = { expiresIn: "15m" };
    return jwt.sign(payload, secret, options);
  }

  static _generateRefreshToken(user) {
    const payload = { id: user._id, email: user.email, phone: user.phone };
    const options = { expiresIn: "7d" };
    return jwt.sign(payload, secret, options);
  }

  static _generateToken(user) {
    const authToken = this._generateAuthToken(user);
    const refreshToken = this._generateRefreshToken(user);
    return { authToken, refreshToken };
  }

  static async register(req, res) {
    var { name, email, phone, password, about } = req.body;

    if (!name || !email || !phone || !password) {
      var message = [];
      if (!name) {
        message.push("name is required");
      }
      if (!phone) {
        message.push("phone is required");
      }
      if (!email) {
        message.push("email is required");
      }
      if (!password) {
        message.push("password is required");
      }
      return ResponseUtility.failed({
        res: res,
        message: message.join(", "),
        code: StatusCode.badRequest,
      });
    }
    var userExists = await UserController.checkUser(email, phone);
    if (userExists) {
      return ResponseUtility.failed({
        res: res,
        message: "Entered email or phone is already in user",
        code: StatusCode.conflict,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    var user = User({
      name,
      email,
      phone,
      about: about ?? "",
      password: hashedPassword,
    });

    try {
      await user.save();
      var token = this._generateToken(user);
      return ResponseUtility.success({
        res: res,
        message: "User registered successfully",
        data: { token, user },
        code: StatusCode.created,
      });
    } catch (e) {
      LogUtility.error("Register User", e);
      return ResponseUtility.failed({
        res: res,
        message: "Internal server error",
        code: StatusCode.serverError,
      });
    }
  }

  static async login(req, res) {
    var { loginType, email, phone, password } = req.body;

    if (loginType == LoginType.email || loginType == LoginType.google) {
      if (!email) {
        return ResponseUtility.failed({
          res: res,
          message: "email is required",
          code: StatusCode.badRequest,
        });
      }
    } else {
      if (!phone) {
        return ResponseUtility.failed({
          res: res,
          message: "phone is required",
          code: StatusCode.badRequest,
        });
      }
    }
    if (!password) {
      return ResponseUtility.failed({
        res: res,
        message: "password is required",
        code: StatusCode.badRequest,
      });
    }

    var user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return ResponseUtility.failed({
        res: res,
        message: "User not found",
        code: StatusCode.notFound,
      });
    }

    var doesPasswordMatch = await user.comparePassword(password);

    if (!doesPasswordMatch) {
      return ResponseUtility.failed({
        res: res,
        message: "Incorrect email or password",
        code: StatusCode.badRequest,
      });
    }

    var token = this._generateToken(user);
    var user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };
    return ResponseUtility.success({
      res: res,
      message: "Logged in successfully",
      data: { token, user },
    });
  }
}

module.exports.AuthService = AuthService;
