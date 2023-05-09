const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    mood: {
      type: String,
      required: true,
      default: "normal",
    },
  },
  { timestamps: true, versionKey: false }
);

const Diary = mongoose.model("Diary", diarySchema);

module.exports.Diary = Diary;
