import { uniqueInt } from './utils.mjs';

export class Petal {
    constructor(colorIdx, pos = [0, 0], angle = 0) {
        this.colorIdx = colorIdx;
        this.pos = pos;
        this.angle = angle;
        
        this.id = uniqueInt();
    }

    toString() {
        return `petal#${this.id} color:${this.colorIdx} angle:${this.angle}`;
    }
}
