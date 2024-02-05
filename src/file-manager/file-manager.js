import { readdirSync } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ERROR_MESSAGES, INPUTS } from '../consts.js';
import { validateInput } from '../utils/validateInput.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class FileManager {
    constructor(username) {
        this.location = __dirname;
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

    async handleInput(args) {
        const input = args.toString('utf-8').trim().split(' ');
        const validatedInput = validateInput(input);

        try {
            await this.runCommand(validatedInput.input);
        } catch (error) {
            console.log(error);
        }

        console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${this.location}\n`);
    }

    async runCommand(input) {
        const commandsDirPath = path.join(__dirname, './commands');
        const commandsPaths = readdirSync(commandsDirPath, { withFileTypes: true }).filter((stat) => stat.isDirectory());
        const commandFile = commandsPaths.map(({name}) => {
                if (name === input) {
                    return import(`./commands/${name}/${name}.js`);
                }
            });
        const command = await Promise.any(commandFile);

        if (input === INPUTS.up) {
            this.location = command.default(this.location);
            return;
        }

        command.default(this.location);
    }

    handleExit() {
        console.log('\x1b[32m%s\x1b[0m', `\nThank you for using File Manager, ${this.username}, goodbye!`);
        process.exit();
    }

    throwError() {
        throw Error(ERROR_MESSAGES.invalidInput);
    }
}