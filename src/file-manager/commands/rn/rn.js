import { rename } from 'node:fs/promises';
import * as path from 'node:path';
import { cwd } from 'node:process';
import { doesFileExist } from '../../../utils/doesFileExist.js';
import { ERROR_MESSAGES } from '../../../consts.js';

export default async (args) => {
    if (!args.length) {
        throw Error(ERROR_MESSAGES.invalidInput);
    }
    
    const [ oldName, newName ] = args;
    const oldFilePath = path.resolve(cwd(), oldName);
    const newFilePath = path.resolve(path.dirname(oldFilePath), newName);

    if (!await doesFileExist(oldFilePath) || await doesFileExist(newFilePath)) {
        throw Error(ERROR_MESSAGES.operationFailed);
    }

    await rename(oldFilePath, newFilePath);
}