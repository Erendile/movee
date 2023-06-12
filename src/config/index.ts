import * as dotenv from 'dotenv';

const envFound = dotenv.config({ path: '.env.local' });

if (envFound.error) {
  throw new Error("Couldn't find .env.local file");
}

const env = (key: string) => process.env[key];

export const config = {
  port: Number(env('PORT')),
};
