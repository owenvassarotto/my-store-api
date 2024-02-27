const boom = require("@hapi/boom");

// this function return a middleware
function validatorHandler(schema, property){
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if(error){
      next(boom.badRequest(error));
    }

    // if there isn't any error, continue
    next();
  }
}

module.exports = validatorHandler;
