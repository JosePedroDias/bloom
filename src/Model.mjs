import { uniqueInt } from './utils.mjs';

export class Model {
    constructor() {
        this.id = uniqueInt();
    }
    
    dispose() {}
}
