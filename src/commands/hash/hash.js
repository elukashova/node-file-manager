import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { ERROR_MESSAGES } from '../../consts.js';

export default async (path) => {
    if (path.length === 0) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    try {
        const filePath = resolve(cwd(), `${path}`);
        const fileContent = await readFile(filePath);
        const hash = createHash('sha256').update(fileContent).digest('hex');
        console.log('\x1b[35m%s\x1b[0m', `${hash}`)
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw Error(ERROR_MESSAGES.operationFailed);
        }
    }
}