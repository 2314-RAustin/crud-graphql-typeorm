import { config } from 'dotenv';
config();

export const {
    SERVICE_PORT,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
} = process.env