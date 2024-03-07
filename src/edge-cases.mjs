import { Board } from './Board.mjs';
import { Flower } from './Flower.mjs';
import { fillNext } from './logic.mjs';

export function _getState(flowerDefs) {
    const board = new Board();

    for (const { pos, petals } of flowerDefs) {
        board.add(new Flower(pos, petals));
    }

    const next = [];
    fillNext(next);

    const score = {
        points: 0,
        combos: 0,
    };

    const moving = { flowerId: undefined, pos: undefined };

    const diff = { added: [], removed: [], changed: [] };

    return { board, next, moving, score, diff };
}

export function emptyState() {
    return _getState([]);
}

export function two1RedPetalFlowersTouching() {
    return _getState([
        { pos: [1, 1], petals: [[1, 0]] },
        { pos: [2, 1], petals: [[1, 0]] },
    ]);
}

/*
adding a flower in the middle with red petals should distribute all petals to the same flower
*/
export function two1RedPetalFlowersWithGapBtw() {
    return _getState([
        { pos: [1, 1], petals: [[1, 0]] },
        { pos: [3, 1], petals: [[1, 0]] },
    ]);
}

/*
we should not give petals away from the placed flower ALWAYS
if tied in the histogram, prioritize distributing colors between different flowers
*/
export function one2ColorsFlower() {
    return _getState([
        { pos: [1, 1], petals: [[1, 0], [1, 1]] },
    ]);
}
