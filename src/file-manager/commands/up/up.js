import { dirname } from 'node:path';
import { homedir } from 'node:os';

export default (location) => {
    return location === homedir() ? location : dirname(location);
}