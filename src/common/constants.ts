import 'dotenv/config';

export const PORT = process.env.PORT ?? 3000;

export const PROCESS_BACKEND_URL = process.env.PROCESS_BACKEND_URL ?? '';

export const DB_HOSTNAME = process.env.DB_HOSTNAME ?? '';
export const DB_USERNAME = process.env.DB_USERNAME ?? '';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';

export const CDN_URL = process.env.CDN_URL ?? '';

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ?? '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? '';
export const AWS_ASSETS_BUCKET = process.env.AWS_ASSETS_BUCKET ?? '';
