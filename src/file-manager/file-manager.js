import { validateInput } from '../utils/validateInput.js';
import { commandRunner } from './command-runner.js';

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
        this.checkForExit(input);

        try {
            await commandRunner(input, args);
            this.location = process.cwd();
        } catch (error) {
            console.log(error);
        }

        console.log('\x1b[36m%s\x1b[0m', `\nYou are currently in ${this.location}\n`);
    }

    checkForExit(input) {
        if (input === '.exit') {
            this.handleExit();
        }
    }

    handleExit() {
        console.log('\x1b[32m%s\x1b[0m', `\nThank you for using File Manager, ${this.username}, goodbye!`);
        process.exit();
    }
}