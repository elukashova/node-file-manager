import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ERROR_MESSAGES } from './consts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class FileManager {
    constructor(username) {
        this.location = __dirname;
        this.username = username;
    }

    init() {
        console.log(`Welcome to the File Manager, ${this.username}!`);
        console.log(`You are currently in ${this.location}\n`);
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        process.stdin.on('data', async (data) => await this.handleInput(data));
        process.on('SIGINT', () => this.handleExit());
    }

    async handleInput(args) {
        const input = args.toString('utf-8').trim().split(' ');
        const validatedInput = this.validateInput(input);
        console.log(validatedInput);

        console.log(`\nYou are currently in ${this.location}\n`);
    }

    validateInput(input) {
        if (!input[0]) {
            this.throwError();
        }

        return {
            input: input[0],
            args: input.slice(1),
        };
    }

    handleExit() {
        console.log(`\nThank you for using File Manager, ${this.username}, goodbye!`);
        process.exit();
    }

    throwError() {
        throw Error(ERROR_MESSAGES.invalidInput);
    }
}