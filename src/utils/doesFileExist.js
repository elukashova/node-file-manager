import * as fs from 'node:fs/promises';

export const doesFileExist = (pathToFile) => fs.access(pathToFile).then(() => true).catch(() => false);