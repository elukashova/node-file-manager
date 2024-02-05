import { createReadStream, lstatSync } from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { ERROR_MESSAGES } from '../../consts.js';

export default (pathToFile) => {
    const stat = lstatSync(`${pathToFile}`);

    if (!pathToFile.length || !stat.isFile()) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    return new Promise((resolve, reject) => {
        const filePath = path.resolve(cwd(), `${pathToFile}`);
        const stream = createReadStream(filePath);

        stream.on('data', (data) => console.log(data.toString('utf-8')));
        stream.on('end', () => resolve());
        stream.on('error', () => reject(ERROR_MESSAGES.operationFailed));
    })
};