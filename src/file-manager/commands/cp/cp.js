import { createReadStream, createWriteStream } from 'node:fs';
import * as path from 'node:path';
import { doesFileExist } from '../../../utils/doesFileExist.js';
import { ERROR_MESSAGES } from '../../../consts.js';

export default async (args) => {
    if (!args.length) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    const [ source, destination ] = args;
    const sourcePath = path.resolve(process.cwd(), source);
    const destinationFolder = path.resolve(process.cwd(), destination);
    const fileName = path.basename(sourcePath);
    const destinationPath = path.resolve(destinationFolder, fileName);

    if (!(await doesFileExist(sourcePath)) || (await doesFileExist(destinationPath))) {
        throw Error(ERROR_MESSAGES.operationFailed);
    }

    return new Promise(async (resolve, reject) => {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destinationPath);

        readStream.pipe(writeStream);
        readStream.on('end', () => resolve());
        readStream.on('error', () => reject(ERROR_MESSAGES.operationFailed));
    });
}