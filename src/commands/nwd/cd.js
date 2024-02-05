import { resolve } from 'node:path';
import { chdir, cwd } from 'node:process';
import { ERROR_MESSAGES } from '../../consts.js';

export default (path) => {
    if (!path.length) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    try {
        const newPath = resolve(cwd(), `${path}`);
        chdir(newPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw Error(ERROR_MESSAGES.operationFailed);
        }
    }
};