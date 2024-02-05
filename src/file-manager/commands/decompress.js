import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, basename } from 'node:path';
import { cwd } from 'node:process';
import { createBrotliDecompress } from 'node:zlib';
import { ERROR_MESSAGES } from '../../consts.js';
import { doesFileExist } from '../../utils/doesFileExist.js';

export default async (args) => {
    if (!args.length) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }

    const [ source, destination ] = args;
    const sourcePath = resolve(cwd(), `${source}`);
    const destinationFilePath = resolve(cwd(), `${destination}`);

    if (!await doesFileExist(sourcePath) || await doesFileExist(destinationFilePath)) {
        throw new Error(ERROR_MESSAGES.operationFailed);
    }

    return new Promise((resolve, reject) => {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(destinationFilePath, { flag: 'wx' });
        
        readStream.pipe(createBrotliDecompress())
        .pipe(writeStream)
        .on('end', () => resolve())
        .on('error', () => reject(ERROR_MESSAGES.operationFailed));
    })
}