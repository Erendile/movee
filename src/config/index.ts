import * as dotenv from 'dotenv';

const envFound = dotenv.config({ path: '.env.local' });

if (envFound.error) {
  throw new Error("Couldn't find .env.local file");
}

const env = (key: string) => process.env[key];

export const config = {
  port: Number(env('PORT')),
  database: {
    name: env('DATABASE_NAME'),
    password: env('DATABASE_PASSWORD'),
    host: env('DATABASE_HOST'),
    user: env('DATABASE_USER'),
    ssl: Boolean(JSON.parse(env('DATABASE_SSL'))),
    synchronize: Boolean(JSON.parse(env('DATABASE_SYNCHRONIZE'))),
  },
  jwt: {
    secret: env('JWT_SECRET'),
  },
};
