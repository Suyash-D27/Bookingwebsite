exports.success = (res, data, message = 'Success') => {
  return res.status(200).json({ message, data });
};

exports.error = (res, error, code = 500) => {
  return res.status(code).json({ message: error.message || error });
};
