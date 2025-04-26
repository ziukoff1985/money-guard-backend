import path from 'node:path';

// ✅ Константа для визначення шляху до тимчасової папки для файлів, які щойно завантажили
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

// ✅ Константа для визначення шляху до постійної папки для зберігання файлів
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// ✅ Константи для визначення тривалості життя токену (в мс):
// Тривалість для Access Token --> 15 хвилин
export const FIFTEEN_MINUTES = 15 * 60 * 1000;

// Тривалість для Refresh Token --> 30 днів
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
