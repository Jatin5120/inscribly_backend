const { Post } = require("../models/post");
const { StatusCode } = require("../utils/enums");
const { LogUtility } = require("../utils/log");
const { ResponseUtility } = require("../utils/response");
const { TagController } = require("./tag");

class PostController {
  static async getPosts(req, res) {
    const { userId } = req.params;

    const posts = await Post.find({ userId });

    if (posts.length === 0) {
      return ResponseUtility.success({
        res,
        message: "No posts found",
        code: StatusCode.noContent,
        data: [],
      });
    }

    return ResponseUtility.success({
      res,
      message: "Posts found",
      code: StatusCode.success,
      data: posts,
    });
  }

  static async createPost(req, res) {
    const { userId, content, postType, tags } = req.body;

    var post = new Post({
      userId,
      content,
      postType,
    });
    await post.save();

    if (tags && tags.length > 0) {
      const tagsList = await Promise.all(
        tags.map(async (name) => {
          return await TagController.createOrUpdateTag({
            name,
            postId: post._id,
          });
        })
      );

      post.tags = tagsList.map((tag) => tag._id);
      await post.save();
    }

    return ResponseUtility.success({
      res,
      message: "Post created successfully",
      data: post,
      code: StatusCode.created,
    });
  }
}

module.exports = { PostController };
