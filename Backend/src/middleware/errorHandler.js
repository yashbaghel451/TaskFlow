const errorHandler = (err, req, res, next) => {
  // if a status code is not set , default set to 500 (bad server)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Agar koi objectId error ho toh
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message= "Resource not found";
  }

  // kisi bhi schema mae validationError jo
  if(err.name==="ValidationError"){
    statusCode=400;
    message= Object.values(err.errors)
    .map((e)=> e.message)
    .join(", ");
  }
  // duplicates value on unique field
  if(err.code===11000){
    statusCode=400;
    message=`Duplicate value for: ${Object.keys(err.keyValue).join(", ")}`;
  }

  res.status(statusCode).json({
    message,

    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
