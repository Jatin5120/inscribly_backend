const { Post } = require("../models/post");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");
const { Tag } = require("../models/tag");

class DatabaseController {
  static async findAllUsers() {
    var users = await User.find();
    return users;
  }

  static async findUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  static async findUserByEmail(email) {
    const user = await User.find({ email: email });
    return user;
  }

  static async findUserByPhone(phone) {
    const user = await User.find({ phone: phone });
    return user;
  }

  static async findAllPosts() {
    var posts = await Post.find();
    return posts;
  }

  static async findPostById(postId) {
    const post = await Post.findById(postId);
    return post;
  }

  static async findPostsByTag(tagName) {
    const tag = await Tag.findOne({ name: tagName });
    if (!tag) {
      return [];
    }

    const posts = await Post.find({ tags: tag._id });
    return posts;
  }

  static async findAllComments() {
    var comments = await Comment.find();
    return comments;
  }

  static async findCommentById(commentId) {
    const comment = await Comment.findById(commentId);
    return comment;
  }
}

module.exports.DatabaseController = DatabaseController;
