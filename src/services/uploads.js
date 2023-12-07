const s3 = require("../config/conexaoAWS");

const uploadImagem = async (path, buffer, mimetype) => {
  const imagem = await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();
  return {
    path: imagem.Key,
    url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${imagem.Key}`,
  };
};

const deletarImagem = async (path) => {
  await s3
    .deleteObject({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
    })
    .promise();
};
module.exports = {
  uploadImagem,
  deletarImagem,
};
