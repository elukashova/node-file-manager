import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { ERROR_MESSAGES } from '../../../consts.js';

export default async (path) => {
    const newFilePath = resolve(cwd(), `${path}`);

    try {
        await writeFile(newFilePath, '', { flag: 'wx' });
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw Error(ERROR_MESSAGES.operationFailed);
        }
    }
};