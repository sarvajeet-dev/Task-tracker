const validate =
  (schema) =>
  (req, res, next) => {
    const result =
      schema.safeParse(
        req.body
      );

    if (!result.success) {
      return res
        .status(400)
        .json({
          status: 400,

          code:
            "VALIDATION_ERROR",

          message:
            result.error
              .errors[0]
              .message,
        });
    }

    next();
  };

export default validate;