import * as os from "os";
import { ERROR_MESSAGES } from '../../consts.js';

const osArgs = {
    eol: '--EOL',
    cpus: '--cpus',
    homedir: '--homedir',
    username: '--username',
    architecture: '--architecture',
}

export default async (args) => {
    const [ arg ] = args;
    
    switch(arg) {
        case osArgs.eol:
            console.log(JSON.stringify(os.EOL));
            break;

        case osArgs.cpus:
            const cpuData = os.cpus().map((cpu, idx) => {
                return {
                    model: cpu.model,
                    'clock rate': `${Math.round(cpu.speed / 100) / 10} GHz`,
                };
            })
            console.table(cpuData);
            break;
        
        case osArgs.homedir:
            console.log(os.homedir());
            break;
        
        case osArgs.username:
            console.log(os.userInfo().username);
            break;

        case osArgs.architecture:
            console.log(os.arch());
            break;

        default:
            throw Error(ERROR_MESSAGES.invalidInput);
    }
}