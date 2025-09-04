import cloudinary from "../config/cloudinary.config";


export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (result?.secure_url) resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};
