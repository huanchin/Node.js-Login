module.exports = (err, req, res, next) => {
  if (
    err.message === "User create fail!" ||
    err.message === "Cannot find this user!" ||
    err.message === "Password incorrect!" ||
    err.message === "403"
  )
    return res.status(500).json({
      status: "error",
      message: err.message,
    });

  return res.status(500).json({
    status: "error",
    message: "Somthing went wrong!",
  });
};
