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

    return { board, next, score };
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

export function fillNext(next) {
    for (let i = 0; i < NUM_NEXT; ++i) {
        const flower = createFlower(NEXT_FLOWER_MAX_PETALS);
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

export const distributeAroundFlower = (board, toFlower, yetToDo, exhausted, onMove, onCombo) => {
    // console.log(`fId:${toFlower.id}, ytd:${yetToDo.size}`);

    const surroundingFlowers = board.getNeighbors(toFlower.pos);
    shuffleInPlace(surroundingFlowers);

    const myColors = toFlower.getExistingColorIndices();

    const candidates = [];

    for (const myColor of myColors) {
        const myCount = toFlower.getNumberOfPetalsWithColor(myColor);

        let totalCount = myCount;

        const candidate = { colorIdx: myColor, myCount, from: [] };

        for (const flower2 of surroundingFlowers) {
            const otherCount = flower2.getNumberOfPetalsWithColor(myColor);
            if (otherCount > 0) {
                totalCount += otherCount;
                candidate.from.push({ flower: flower2, count: otherCount });
            }
        }

        candidate.totalCount = totalCount;

        if (candidate.from.length > 0) candidates.push(candidate);
    }

    if (candidates.length > 0) {
        candidates.sort((a, b) => b.totalCount - a.totalCount); // descending
        const max = candidates[0].totalCount;

        const candidateWithMax = candidates.filter(c => c.totalCount === max);
        shuffleInPlace(candidateWithMax);

        const candidate = candidateWithMax[0];

        const colorIdx = candidate.colorIdx;

        candidate.from.sort((a, b) => a.count - b.count); // ascending

        const fromFlower = candidate.from[0].flower;

        const petalsOfOtherColors = toFlower.getPetalsWithoutColor(colorIdx);
        shuffleInPlace(petalsOfOtherColors);
        if (petalsOfOtherColors.length > 0 && surroundingFlowers.length > 0) {
            const colorIdx2 = petalsOfOtherColors[0].colorIdx;

            const candidates2 = [];
            shuffleInPlace(surroundingFlowers);
            for (const flower2 of surroundingFlowers) {
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
        // console.log(key);

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
