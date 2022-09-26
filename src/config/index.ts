import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, STRIPE_SECRET, STRIP_COUNTRY, STRIPE_APPLICATION_FEE, STRIPE_CURRENCY, STRIPE_REFRESH_URL, STRIPE_RETURN_URL } = process.env;
