const errorHandler = (
    err,
    req,
    res,
    next
  ) => {
    return res.status(
      err.statusCode || 500
    ).json({
      status:
        err.statusCode || 500,
  
      code:
        err.code ||
        "INTERNAL_SERVER_ERROR",
  
      message:
        err.message ||
        "Something went wrong",
    });
  };
  
  export default errorHandler;