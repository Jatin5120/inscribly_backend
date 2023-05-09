const { ResponseUtility, LogUtility } = require("../utils/utils");
const { storageBucket } = require("../../firebase");
const { MAX_FILE_COUNT, StatusCode } = require("../config/config");

class UploadController {
  static async uploadSingle(req, res) {
    try {
      if (!req.file) {
        return ResponseUtility.failed({
          res,
          message: "No file uploaded",
          code: StatusCode.badRequest,
        });
      }

      const metadata = {
        contentType: req.file.mimetype,
      };

      const fileName = `files/${req.file.originalname}`;
      const file = storageBucket.file(fileName);
      const stream = file.createWriteStream({
        metadata,
      });

      stream.on("error", (error) => {
        LogUtility.error("File upload", error);
        return ResponseUtility.failed({
          res,
          message: "Error while uploading file",
          code: StatusCode.serverError,
        });
      });

      stream.on("finish", async () => {
        try {
          const [downloadUrl] = await file.getSignedUrl({
            action: "read",
            expires: "9999-12-31",
          });

          const data = {
            type: req.file.mimetype,
            downloadUrl,
          };
          return ResponseUtility.success({
            res,
            data: data,
            message: "File uploaded successfully",
            code: StatusCode.created,
          });
        } catch (e) {
          return ResponseUtility.failed({
            res,
            message: `Error occured while generating download url - ${e.message}`,
            code: StatusCode.serverError,
          });
        }
      });

      stream.end(req.file.buffer);
    } catch (e) {
      return ResponseUtility.failed({
        res,
        message: `Error occured while uploading file - ${e.message}`,
        code: StatusCode.serverError,
      });
    }
  }

  static async uploadMultiple(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return ResponseUtility.failed({
          res,
          message: "No file uploaded",
          code: StatusCode.badRequest,
        });
      }

      var number = req.params.number;
      if (number > MAX_FILE_COUNT) {
        return ResponseUtility.failed({
          res,
          message: `Maximum ${MAX_FILE_COUNT} files can be uploaded once`,
          code: StatusCode.badRequest,
        });
      }

      const metadata = {
        contentType: req.file.mimetype,
      };

      const fileName = `files/${req.file.originalname}`;
      const file = storageBucket.file(fileName);
      const stream = file.createWriteStream({
        metadata,
      });

      stream.on("error", (error) => {
        LogUtility.error("File upload", error);
        return ResponseUtility.failed({
          res,
          message: "Error while uploading file",
          code: StatusCode.serverError,
        });
      });

      stream.on("finish", async () => {
        try {
          const [downloadUrl] = await file.getSignedUrl({
            action: "read",
            expires: "9999-12-31",
          });

          const data = {
            type: req.file.mimetype,
            downloadUrl,
          };
          return ResponseUtility.success({
            res,
            data: data,
            message: "File uploaded successfully",
            code: StatusCode.created,
          });
        } catch (e) {
          return ResponseUtility.failed({
            res,
            message: `Error occured while generating download url - ${e.message}`,
            code: StatusCode.serverError,
          });
        }
      });

      stream.end(req.file.buffer);
    } catch (e) {
      return ResponseUtility.failed({
        res,
        message: `Error occured while uploading file - ${e.message}`,
        code: StatusCode.serverError,
      });
    }
  }
}

module.exports = { UploadController };
