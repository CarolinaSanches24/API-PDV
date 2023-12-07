const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);
const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.ID_KEY,
    secretAccessKey: process.env.APP_KEY,
  },
});

module.exports = s3;
