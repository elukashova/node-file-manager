import { FileManager } from './file-manager/file-manager.js';

class App {
    constructor() {
        const args = process.argv.slice(2);
        const username = this.getUsername(args);
        const fileManager = new FileManager(username);
        fileManager.init();
    }

    getUsername(args) {
        const usernameArg = args.find((arg) => arg.startsWith('--username'));

        if (!usernameArg) {
            console.log('No username has been provided.');
            return 'Anonymous';
        }

        return usernameArg.split('=')[1];
    }
}

new App();