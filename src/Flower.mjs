import { unique, uniqueInt, times, randInt, shuffleInPlace } from './utils.mjs';

export const NUM_PETALS = 6;
export const NUM_COLORS = 6;

const ANGLE_INC = 360 / NUM_PETALS;

export class Flower {
    constructor(pos = [0, 0]) {
        this.pos = pos;

        this.id = uniqueInt();
        this.petals = [];
        this.startAngle = randInt(NUM_PETALS) * ANGLE_INC;
        this.colorOrder = times(NUM_COLORS);
        shuffleInPlace(this.colorOrder);
    }

    setPos(pos) {
        this.pos = Array.from(pos);
        for (const p of this.petals) {
            p.pos = Array.from(this.pos);
        }
    }

    _sortPetals() {
        const { colorOrder, startAngle } = this;

        const getV = (p) => {
            const order = colorOrder.indexOf(p.colorIdx);
            return 1000 * order + p.id;
        }

        this.petals.sort((a, b) => getV(a) - getV(b));

        this.petals.forEach((p, i) => p.angle = startAngle + i * ANGLE_INC);
    }

    add(p) {
        // it can now temporarily happen during distributeAroundFlower
        /* if (this.petals.length >= NUM_PETALS) {
            throw new Error('too many petals!');
        } */

        if (this.petals.some(pp => pp.id === p.id)) {
            throw new Error('petal already exists!');
        }
        
        p.pos = Array.from(this.pos);
        this.petals.push(p);
        this._sortPetals();
    }

    removeHavingColor(colorIdx, without) {
        const candidates = without ? this.getPetalsWithoutColor(colorIdx) : this.getPetalsWithColor(colorIdx);
        if (candidates.length === 0) {
            throw new Error(`no petal ${without ? 'without' : 'with'} value ${colorIdx}!`);
        }

        const i = randInt(candidates.length);
        const petal = candidates[i];

        const j = this.petals.findIndex(p => p.id === petal.id);
        this.petals.splice(j, 1);

        this._sortPetals();

        return petal;
    }

    getPetalsWithoutColor(colorIdx) {
        return this.petals.filter(p => p.colorIdx !== colorIdx);
    }

    getPetalsWithColor(colorIdx) {
        return this.petals.filter(p => p.colorIdx === colorIdx);
    }

    getNumberOfPetalsWithColor(colorIdx) {
        return this.getPetalsWithColor(colorIdx).length;
    }

    getNumberOfPetals() {
        return this.petals.length;
    }

    getHistogram() {
        const h = [];
        for (let i = 0; i < NUM_COLORS; ++i) {
            h.push(this.getNumberOfPetalsWithColor(i));
        }
        return h;
    }

    getExistingColorIndices() {
        return unique(this.petals.map(p => p.colorIdx));
    }

    isEmpty() {
        return this.petals.length === 0;
    }

    isFull() {
        return this.petals.length === NUM_PETALS;
    }

    hasBloomed() {
        if (!this.isFull()) return false;
        const colorIdx = this.petals[0].colorIdx;
        return this.getNumberOfPetalsWithColor(colorIdx) === NUM_PETALS;
    }

    toString() {
        return `flower#${this.id} pos:${this.pos.join(',')} startAngle:${this.startAngle}`;
    }
}