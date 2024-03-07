import { default as m } from '../vendor/mithril.mjs';

import { Flower } from './Flower.mjs';
import { distributeAroundFlower } from './logic.mjs';
import { svgWrapper, boardView2 } from './view-svg.mjs';
import * as cases from './edge-cases.mjs';

const MAX_STEPS = 30;

const CW = 4;
const CH = 6;

const GREEN = 'green';
const BLUE = 'blue';
const PURPLE = 'purple';
const RED = 'red';
const ORANGE = 'orange';

const log = (s, c = 'black', html = false) => {
    console.log(`%c${s}`, `color:${c}`);
    if (html) {
        const pEl = document.createElement('p');
        pEl.appendChild(document.createTextNode(s));
        pEl.style.color = c;
        document.body.appendChild(pEl);
    }
};

const logBoard = (board, w = 140) => {
    //return;
    const spanEl = document.createElement('span');
    document.body.appendChild(spanEl);
    m.render(spanEl, svgWrapper(boardView2(board.clone()), [0, 0, CW, CH], w));
}

document.body.style = 'text-align:left';

const organizeBoard = (board, optFlower) => {
    log(`organizeBoard ${optFlower ? optFlower.toString() : 'empty'}`, BLUE);
    const yetToDo = new Set(optFlower ? [optFlower] : board.getAllFilledCells());
    const onMove = () => {}; // console.log('  onMove');
    const onCombo = () => {}; // console.log('  onCombo');
    let steps = 0;
    while (yetToDo.size > 0 && steps < MAX_STEPS) {
        const toFlower = yetToDo.values().next().value;
        ++steps;
        const changed = distributeAroundFlower(board, toFlower, yetToDo, onMove, onCombo);
        if (changed) {
            //console.log('  changed');
            /* log(board.toString(), ORANGE);
            logBoard(board); */
        } else {
            yetToDo.delete(toFlower);
        }
    }

    if (yetToDo.size !== 0) throw new Error('aborted');
}

const exercise = (testName, moves, testingFn, getStateFn = cases.emptyState) => {
    log(`------------`, PURPLE);
    log(`exercise ${testName}`, PURPLE, true);

    try {
        const { board } = getStateFn();

        //log(board.toString(), ORANGE);
        //logBoard(board);

        organizeBoard(board);
        //log(board.toString(), ORANGE);
        //logBoard(board);

        for (const { pos, petals } of moves) {
            const f = new Flower(pos, petals);
            f.setPos(pos);
            board.add(f);

            //log('+ ' + f.toString());

            organizeBoard(board, f);
            log(board.toString(), ORANGE);
            logBoard(board);
        }

        testingFn(board, board.getAllFilledCells());
        log('OK', GREEN, true);
    } catch (err) {
        log(err.message, RED, true);
        console.error(err);
    }
}

{
    exercise('simple flower should be kept as is', [
        { pos: [0, 2], petals: [[1, 0]] },
    ], (b, flowers) => {
        if (flowers.length !== 1) throw new Error('wrong number of flowers');
        if (flowers[0].getNumberOfPetals() !== 1) throw new Error('wrong number of petals');
        if (flowers[0].getNumberOfPetalsWithColor(0) !== 1) throw new Error('wrong colorIdx');
    });

    exercise('two contiguous flowers should merge', [
        { pos: [0, 2], petals: [[1, 0]] },
        { pos: [1, 2], petals: [[1, 0]] },
    ], (b, flowers) => {
        if (flowers.length !== 1) throw new Error('wrong number of flowers');
        if (flowers[0].getNumberOfPetals() !== 2) throw new Error('wrong number of petals');
        if (flowers[0].getNumberOfPetalsWithColor(0) !== 2) throw new Error('wrong colorIdx');
    });

    exercise('two contiguous flowers with different colors should be kept as is', [
        { pos: [0, 2], petals: [[1, 0]] },
        { pos: [1, 2], petals: [[1, 1]] },
    ], (b, flowers) => {
        if (flowers.length !== 2) throw new Error('wrong number of flowers');
        if (flowers[0].getNumberOfPetals() !== 2) throw new Error('wrong number of petals');
        if (flowers[0].getNumberOfPetalsWithColor(0) !== 2) throw new Error('wrong colorIdx');
    });

    exercise('should group all 3 contiguous flowers of same color to one', [
        { pos: [0, 1], petals: [[1, 0]] },
        { pos: [2, 1], petals: [[1, 0]] },
        { pos: [1, 1], petals: [[1, 0]] },
    ], (b) => {
        const flowers = b.getAllFilledCells();
        if (flowers.length !== 1) throw new Error('wrong number of flowers');
        //if (flowers[0].petals.length !== 3) throw new Error('wrong number of petals');
    });
}
