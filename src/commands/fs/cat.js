import { createReadStream } from 'node:fs';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { ERROR_MESSAGES } from '../../consts.js';
import { doesFileExist } from '../../utils/doesFileExist.js';

export default async (pathToFile) => {
    if (!pathToFile.length) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    const filePath = path.resolve(cwd(), `${pathToFile}`);
    if (!await doesFileExist(filePath)) {
        throw Error(ERROR_MESSAGES.operationFailed);
    }

    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath);

        stream.on('data', (data) => console.log(data.toString('utf-8')));
        stream.on('end', () => resolve());
        stream.on('error', () => reject());
    })
};