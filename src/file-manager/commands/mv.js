import cp from './cp.js';
import rm from './rm.js';

export default async (args) => {
    await cp(args);
    await rm(args[0]);
}