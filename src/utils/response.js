const { StatusCode, RequestStatus } = require("./enums");

class ResponseUtility {
  static success({
    res,
    data,
    message = "Data Found",
    code = StatusCode.success,
  } = {}) {
    res.status(code).send({
      status: RequestStatus.success,
      message: message,
      data: data,
    });
  }

  static failed({ res, message = "Error Occured", code } = {}) {
    res.status(code).send({
      status: RequestStatus.error,
      message: message,
    });
  }
}

module.exports.ResponseUtility = ResponseUtility;
