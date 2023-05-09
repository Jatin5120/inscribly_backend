const { StatusCode, LogUtility, PostType } = require("../utils/utils");
const { User } = require("../models/user");
const { ResponseUtility } = require("../utils/response");

class PostMiddleware {
  static async validateUpload(req, res, next) {
    const { userId, content, postType } = req.body;

    if (!userId || !content || !postType) {
      const errorMsg = [];
      if (!userId) {
        errorMsg.push("userId is required");
      }
      if (!content) {
        errorMsg.push("content is required");
      }
      if (!postType) {
        errorMsg.push("postType is required");
      }

      return ResponseUtility.failed({
        res,
        message: errorMsg,
        code: StatusCode.badRequest,
      });
    }

    if (
      ![
        PostType.poem,
        PostType.poetry,
        PostType.quote,
        PostType.song,
        PostType.story,
      ].includes(postType)
    ) {
      return ResponseUtility.failed({
        res,
        message: "Invalid postType",
        code: StatusCode.badRequest,
      });
    }

    var user = await User.findOne({ userId });

    if (!user) {
      return ResponseUtility.failed({
        res,
        message: "User not found",
        code: StatusCode.notFound,
      });
    }
    next();
  }

  static async validateGet(req, res, next) {
    const { userId, postType } = req.params;

    if (!userId) {
      return ResponseUtility.failed({
        res,
        message: "userId is required",
        code: StatusCode.badRequest,
      });
    }

    if (
      postType &&
      ![
        PostType.poem,
        PostType.poetry,
        PostType.quote,
        PostType.song,
        PostType.story,
      ].includes(postType)
    ) {
      return ResponseUtility.failed({
        res,
        message: "Invalid postType",
        code: StatusCode.badRequest,
      });
    }

    var user = await User.findOne({ _id: userId });

    if (!user) {
      return ResponseUtility.failed({
        res,
        message: "User not found",
        code: StatusCode.notFound,
      });
    }
    next();
  }
}

module.exports = { PostMiddleware };
