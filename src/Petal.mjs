import { Model } from './Model.mjs';

export class Petal extends Model {
    constructor(colorIdx, pos = [0, 0], angle = 0) {
        super();
        
        this.colorIdx = colorIdx;
        this.pos = pos;
        this.angle = angle;
    }

    toString() {
        return `petal#${this.id} color:${this.colorIdx} angle:${this.angle}`;
    }

    clone() {
        const p = new Petal(this.colorIdx, this.pos.slice(), this.angle);
        p.id = this.id;
        return p;
    }
}
