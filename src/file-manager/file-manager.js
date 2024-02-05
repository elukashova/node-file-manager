import { readdirSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ERROR_MESSAGES } from '../consts.js';
import { validateInput } from '../utils/validateInput.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class FileManager {
    constructor(username) {
        this.location = process.cwd();
        this.username = username;
    }

    init() {
        console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager, ${this.username}!`);
        console.log('\x1b[36m%s\x1b[0m', `You are currently in ${this.location}\n`);
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        process.stdin.on('data', async (data) => await this.handleInput(data));
        process.on('SIGINT', () => this.handleExit());
    }

    async handleInput(inputArgs) {
        const userInput = inputArgs.toString('utf-8').trim().split(' ');
        const validatedInput = validateInput(userInput);
        const { input, args } = validatedInput;

        try {
            await this.runCommand(input, args);
            this.location = process.cwd();
        } catch (error) {
            console.log(error);
        }

        console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${this.location}\n`);
    }

    async runCommand(input, args) {
        const commandsDirPath = path.join(__dirname, './commands');
        const commandsPaths = readdirSync(commandsDirPath, { withFileTypes: true }).filter((stat) => stat.isDirectory());
        const commandFile = commandsPaths.filter(({ name }) => name === input);
        const { name } = commandFile[0];
        const command = await import(`./commands/${name}/${name}.js`);
        await command.default(args);
    }

    handleExit() {
        console.log('\x1b[32m%s\x1b[0m', `\nThank you for using File Manager, ${this.username}, goodbye!`);
        process.exit();
    }

    throwError() {
        throw Error(ERROR_MESSAGES.invalidInput);
    }
}