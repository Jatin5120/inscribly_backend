const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    diaries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diary",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports.Folder = Folder;
