import 'dotenv/config'

export const DB_HOSTNAME = process.env.DB_HOSTNAME ?? '';
export const DB_USERNAME = process.env.DB_USERNAME ?? '';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
export const CDN_URL = process.env.CDN_URL ?? '';