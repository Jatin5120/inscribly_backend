module.exports.PostType = {
  quote: "quote",
  poem: "poem",
  poetry: "poetry",
  song: "song",
  story: "story",
};

module.exports.StatusCode = {
  success: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  timeout: 408,
  conflict: 409,
  serverError: 500,
};

module.exports.RequestStatus = {
  success: true,
  error: false,
};
