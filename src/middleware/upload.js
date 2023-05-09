const Multer = require("multer");
const { MAX_FILE_COUNT } = require("../config/config");

class UploadMiddleware {
  static _multer = Multer({ storage: Multer.memoryStorage() });

  static singleFile = async (req, res) => this._multer.single("filename");

  static multipleFiles = async (req, res) =>
    this._multer.array("files", MAX_FILE_COUNT);
}

module.exports.UploadMiddleware = UploadMiddleware;
