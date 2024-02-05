import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async () => {
    const files = await readdir(resolve(cwd()) , {
        withFileTypes: true,
    });

    console.table(
        files
        .map((file) => {
            return {
                name: file.name,
                type: file.isFile() ? 'file' : 'directory',
            };
        })
        .sort((a, b) => {
            if (a.type === b.type) {
                return a.name.localeCompare(b.name)
            } else if (a.type === 'file') {
                return 1
            }

            return -1;
        })
    );
}