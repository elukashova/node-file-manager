import { readdir } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ERROR_MESSAGES } from '../consts.js';

export const commandRunner = async (input, args) => {
    const folderName = getFolderName(input);
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const commandsDirPath = path.join(__dirname, '../commands');
    const commandsFolderPath = path.resolve(commandsDirPath, folderName);
    const commandsPaths = await readdir(commandsFolderPath, { withFileTypes: true });
    const filteredCommands = commandsPaths.filter((stat) => stat.isFile());
    const commandFile = filteredCommands.filter(({ name }) => name.split(".")[0] === input);
    if (commandFile.length === 0) {
        console.error(ERROR_MESSAGES.invalidInput);
        return;
    }
    const { name: commandFileName } = commandFile[0];
    const command = await import(`../commands/${folderName}/${commandFileName}`);;
    await command.default(args);
}

const getFolderName = (input) => {
    if (input === 'cd' || input === 'ls' || input === 'up') {
        return 'nwd';
    }
    if (input === 'add' || input === 'cat' || input === 'cp' || input === 'mv' || input === 'rm' || input === 'rn') {
        return 'fs';
    }
    if (input === 'os') {
        return 'os';
    }
    if (input === 'hash') {
        return 'hash';
    }
    if (input === 'compress' || input === 'decompress') {
        return 'brotli'
    }

    console.error(ERROR_MESSAGES.invalidInput);
}