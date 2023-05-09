const { Tag } = require("../models/tag");

class TagController {
  static getTag = async (name) => await Tag.findOne({ name });

  static async createOrUpdateTag({ name, postId }) {
    const tag = await Tag.findOneAndUpdate(
      { name: name },
      { $setOnInsert: { name: name }, $addToSet: { posts: postId } },
      { upsert: true, new: true }
    );
    return tag;
  }
}

module.exports = { TagController };
