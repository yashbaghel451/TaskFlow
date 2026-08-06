// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;

// import { v2 as cloudinary } from "cloudinary";

// console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log(
//   "Cloudinary API Key:",
//   process.env.CLOUDINARY_API_KEY ? "API KEY FOUND" : "API KEY NOT FOUND"
// );
// console.log(
//   "Cloudinary API Secret:",
//   process.env.CLOUDINARY_API_SECRET
//     ? "API SECRET FOUND"
//     : "API SECRET NOT FOUND"
// );

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Final Config:", cloudinary.config());

export default cloudinary;
