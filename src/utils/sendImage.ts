import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { promisify } from "util";
import { AppError } from "../errors/AppError";

const unlinkAsync = promisify(fs.unlink);

// Configurar o Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface UploadOptions {
  folder: string;
}

export const uploadImage = async (filePath: string, options: UploadOptions) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    await unlinkAsync(filePath); // Remove o arquivo temporário
    return result;
  } catch (error) {
    throw new AppError("Erro ao enviar imagem", 500);
  }
};

export const uploadImages = async (
  filePaths: string[],
  options: UploadOptions
) => {
  try {
    const uploadResults = [];
    for (const filePath of filePaths) {
      const result = await cloudinary.uploader.upload(filePath, options);
      uploadResults.push(result);
      await unlinkAsync(filePath); // Remove o arquivo temporário
    }
    return uploadResults;
  } catch (error) {
    throw new AppError("Erro ao enviar imagens", 500);
  }
};
