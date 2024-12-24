import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * @description runs as setup before all the test
 *
 * @export
 * @async
 */
export default async function globalSetup() {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        throw new Error('env file is not found');
    }
    dotenv.config({ path: envPath });
    const enviroment = process.env.ENVIRONMENT;
    if (!enviroment) {
        throw new Error('Environment is not set')
    }
    if (!process.env[`${enviroment}_BASE_URL`]) {
        throw new Error('Base URL is not set')
    }
}