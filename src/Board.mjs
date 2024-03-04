export const BW = 4;
export const BH = 6;

const boardToKey = ([x, y]) => `${x},${y}`;

export class Board {
    constructor() {
        this.cells = new Map();
    }

    get(pos) {
        return this.cells.get(boardToKey(pos));
    }

    getNeighbors([x, y]) {
        const neighbors = [];
        for (const pos of [[x-1, y], [x+1, y], [x, y-1], [x, y+1]]) {
            const nei = this.get(pos);
            if (nei) neighbors.push(nei);
        }
        return neighbors;
    }

    add(flower) {
        this.cells.set(boardToKey(flower.pos), flower);
    }

    remove(flower) {
        this.cells.delete(boardToKey(flower.pos));
    }

    allCellsAreFilled() {
        return this.cells.size === BW * BH;
    }

    getAllFilledCells() {
        return Array.from(this.cells.values());
    }

    getPositions([dx, dy] = [0, 0]) {
        const positions = [];
        for (let yi = 0; yi < BH - dy; ++yi) {
            for (let xi = 0; xi < BW - dx; ++xi) {
                positions.push([xi, yi]);
            }
        }
        return positions;
    }
}
