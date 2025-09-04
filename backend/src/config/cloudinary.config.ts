import {v2 as cloudinary} from 'cloudinary';
import { envConfig } from './env.config';

cloudinary.config({
  cloud_name: envConfig.cloudName,
  api_key: envConfig.apiKey,
  api_secret: envConfig.apiSecret
});

export default cloudinary;
