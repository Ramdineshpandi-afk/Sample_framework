import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export default async function globalSetup() {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        throw new Error('env file is not found');
    }
    dotenv.config({ path: envPath });
    if (!process.env.BASE_URL) {
        throw new Error('Base URL is not set')
    }
}