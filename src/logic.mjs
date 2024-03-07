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
    if (isEmpty || f.hasBloomed()) {
        yetToDo.delete(f);
        board.remove(f);
        if (!isEmpty) onCombo();
        return true;
    }
    return false;
}

export const distributeAroundFlower = (board, toFlower0, yetToDo, exhausted, onMove, onCombo) => {
    // console.log(`fId:${toFlower.id}, ytd:${yetToDo.size}`);

    const surroundingFlowers = [toFlower0, ...board.getNeighbors(toFlower0.pos)];
    shuffleInPlace(surroundingFlowers);

    const myColors = toFlower0.getExistingColorIndices();

    const candidates = [];

    for (const myColor of myColors) {
        const candidate = { colorIdx: myColor, from: [] };

        for (const flower2 of surroundingFlowers) {
            const count = flower2.getNumberOfPetalsWithColor(myColor);
            if (count === 0) continue;
            candidate.from.push({ flower: flower2, count });
        }

        if (candidate.from.length > 1) {
            candidate.total = candidate.from.reduce((sum, { count }) => sum + count, 0);
            candidates.push(candidate);
        }
    }

    if (candidates.length > 0) {
        candidates.sort((a, b) => b.total - a.total); // descending
        const candidate = candidates[0];

        const colorIdx = candidate.colorIdx;
        const from = candidate.from;
        from.sort((a, b) => b.count - a.count); // descending
        const toFlower   = from[0].flower;
        const fromFlower = from[from.length - 1].flower;

        const petalsOfOtherColors = toFlower.getPetalsWithoutColor(colorIdx);
        shuffleInPlace(petalsOfOtherColors);
        if (petalsOfOtherColors.length > 0 && surroundingFlowers.length > 1) {
            const colorIdx2 = petalsOfOtherColors[0].colorIdx;

            const candidates2 = [];
            shuffleInPlace(surroundingFlowers);
            for (const flower2 of surroundingFlowers) {
                if (flower2 === toFlower) continue;
                if (flower2.isFull()) continue;
                const otherCount = flower2.getNumberOfPetalsWithColor(colorIdx2);
                if (otherCount === 0) continue;
                candidates2.push({ flower: flower2, count: otherCount });
            }
            
            let toFlower2 = surroundingFlowers[0];
            if (candidates2.length > 0) {
                candidates2.sort((a, b) => b.count - a.count); // descending
                toFlower2 = candidates2[0].flower;
            }

            transferSimple(toFlower2, toFlower, colorIdx2);

            onMove();
            handleFlower(board, toFlower2, yetToDo, onCombo);

            if (!toFlower2.isFull()) {
                yetToDo.add(toFlower2);
            }
        }

        const key = `#${fromFlower.id} ->(${colorIdx})-> #${toFlower.id} ${toFlower.getHistogram()}`;
        if (exhausted.has(key)) return false;
        exhausted.add(key);

        transferSimple(toFlower, fromFlower, colorIdx);

        onMove();
        handleFlower(board, fromFlower, yetToDo, onCombo);
        handleFlower(board, toFlower,   yetToDo, onCombo);

        if (!toFlower.isFull()) {
            yetToDo.add(toFlower);
        }

        if (!fromFlower.isEmpty()) {
            yetToDo.add(fromFlower);
        }

        return true;
    }
    
    return false;
}
