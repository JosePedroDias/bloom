import { randInt, shuffleInPlace } from './utils.mjs';
import { Flower, NUM_PETALS, NUM_COLORS } from './Flower.mjs';
import { Petal } from './Petal.mjs';
import { Board } from './Board.mjs';

export { NUM_COLORS } from './Flower.mjs';

export const NUM_NEXT = 4;
export const BOARD_FLOWER_DENSITY = 0.15;

const BOARD_FLOWER_MAX_PETALS = 4;
const NEXT_FLOWER_MAX_PETALS = 4;

const createFlower = (maxPetals = NUM_PETALS, pos = [0, 0]) => {
    const flower = new Flower(pos);
    const numPetals = 1 + randInt(maxPetals - 1);
    for (let i = 0; i < numPetals; ++i) {
        const colorIdx = randInt(NUM_COLORS);
        const petal = new Petal(colorIdx);
        flower.add(petal);
    }
    return flower;
}

export function getState() {
    const board = new Board();
    
    fillBoard(board);

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

export function isGameOver(board) {
    return board.allCellsAreFilled();
}

function fillBoard(board) {
    for (const [xi, yi] of board.getPositions()) {
        const skipFlower = Math.random() > BOARD_FLOWER_DENSITY;
        if (skipFlower) continue;
        const flower = createFlower(BOARD_FLOWER_MAX_PETALS, [xi, yi]);
        board.add(flower);
    }
}

/* function fillBoard_(board) {
    {
        const flower = new Flower([0, 0]);
        flower.add(new Petal(0));
        flower.add(new Petal(1));
        flower.add(new Petal(2));
        board.add(flower);
    }

    {
        const flower = new Flower([1, 0]);
        flower.add(new Petal(0));
        flower.add(new Petal(1));
        board.add(flower);
    }
} */

export function isNextEmpty(next) {
    return next.every(f => f === undefined);
}

export function fillNext(next) {
    next.splice(0, 4);
    for (let i = 0; i < NUM_NEXT; ++i) {
        const flower = createFlower(NEXT_FLOWER_MAX_PETALS, [i, 7]);
        next.push(flower);
    }
}

export const transferSimple = (toFlower, fromFlower, colorIdx) => {
    // console.log(`  transfer #${fromFlower.id} -> #${toFlower.id} (${colorIdx})`);
    const petal = fromFlower.removeHavingColor(colorIdx);
    toFlower.add(petal);
}

export const handleFlower = (board, f, yetToDo, onCombo) => {
    const isEmpty = f.isEmpty();
    if (isEmpty || f.isComplete()) {
        yetToDo.delete(f);
        board.remove(f);
        if (!isEmpty) onCombo();
        return true;
    }
    return false;
}

export const findGoodTransfer = (flowers, myColors, fromFlowerFixed) => {
    shuffleInPlace(flowers);

    const candidates = [];

    for (const colorIdx of myColors) {
        const owners = [];

        for (const flower of flowers) {
            const count = flower.getNumberOfPetalsWithColor(colorIdx);
            if (count === 0 && !fromFlowerFixed) continue;
            owners.push({ flower, count });
        }

        if (owners.length > 1 || (fromFlowerFixed && owners.length > 0)) {
            const total = owners.reduce((sum, { count }) => sum + count, 0);
            owners.sort((a, b) => b.count - a.count); // descending

            const toFlower = owners[0].flower;
            const fromFlower = fromFlowerFixed || owners[owners.length - 1].flower;
            candidates.push({ total, colorIdx, fromFlower, toFlower });
        }
    }

    if (candidates.length > 0) {
        candidates.sort((a, b) => b.total - a.total); // descending
        return candidates[0];
    }
}

export const distributeAroundFlower = (board, centerFlower, yetToDo, onMove, onCombo) => {
    console.log(`distributeAroundFlower: #${centerFlower.id}, ytd:${yetToDo.size}`);

    const onTransfer = ({ colorIdx, fromFlower, toFlower }) => {
        console.log(`#${fromFlower.id} ->(${colorIdx})-> #${toFlower.id} ${toFlower.getHistogram()}`);
        
        transferSimple(toFlower, fromFlower, colorIdx);

        onMove();
        handleFlower(board, fromFlower, yetToDo, onCombo);
        handleFlower(board, toFlower,   yetToDo, onCombo);

        if (!toFlower.isFull()) yetToDo.add(toFlower);
        if (!fromFlower.isEmpty()) yetToDo.add(fromFlower);
    }

    const atMost5Flowers = [centerFlower, ...board.getNeighbors(centerFlower.pos)];

    const centerFlowerColors = centerFlower.getExistingColorIndices();

    const candidate1 = findGoodTransfer(atMost5Flowers, centerFlowerColors);
    if (!candidate1) return false;
    console.log('candidate1', candidate1);
    
    const petalsOfOtherColors = candidate1.toFlower.getColorIndicesWithoutColorIdx(candidate1.colorIdx);

    const atMost4Flowers = atMost5Flowers
    .filter(f => f !== candidate1.toFlower)
    .filter(f => !f.isFull());

    const candidate2 = petalsOfOtherColors ? findGoodTransfer(atMost4Flowers, petalsOfOtherColors, candidate1.toFlower) : undefined;

    if (candidate2) {
        console.log('candidate2', candidate2);
        onTransfer(candidate2);
    } 
    onTransfer(candidate1);
    
    return true;
}
