const s3 = require("../config/conexaoAWS");

const uploadImagem = async (path, buffer, mimetype) => {
  try {
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
  } catch (error) {
    console.error("Erro ao fazer upload da imagem para o S3:", error);
    throw new Error("Erro ao fazer upload da imagem para o S3");
  }
};

const deletarImagem = async (path) => {
  try {
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
      })
      .promise();
    console.log(`Imagem deletada com sucesso: ${path}`);
  } catch (error) {
    console.error(`Erro ao deletar imagem do S3: ${path}`, error);
    throw new Error("Erro ao deletar imagem do S3");
  }
};

module.exports = {
  uploadImagem,
  deletarImagem,
};
