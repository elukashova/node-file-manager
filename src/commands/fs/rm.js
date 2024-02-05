import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { rm } from 'fs/promises';
import { ERROR_MESSAGES } from '../../consts.js';

export default async (path) => {
    if (!path) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    try {
        const filePath = resolve(cwd(), `${path}`);
        await rm(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw Error(ERROR_MESSAGES.operationFailed);
        }
    }
}