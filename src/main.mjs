import { redraw, default as m } from '../vendor/mithril.mjs';

import { getState, distributeAroundFlower, fillNext, isGameOver } from './logic.mjs';
import { sleep } from './utils.mjs';
import { boardView } from './view.mjs';

const CW = 6;
const CH = 10;

const MOVE_MS = 310;
const DRAG_MS = 1000 / 10;

const MAX_STEPS = 30;

const vb = [0, 0, CW, CH];

const rootEl = document.body;
let vnode;
let movePositions = [];

const { board, next, score, moving } = getState();

let processing = false;

const organizeBoard = async (optFlower) => {
    processing = true;

    const startCombos = score.combos;

    const yetToDo = new Set(optFlower ? [optFlower] : board.getAllFilledCells());
    const exhausted = new Set();
    let steps = 0;

    const onMove = () => {
        score.points += Math.pow(2, score.combos);
    }
    const onCombo = () => score.combos += 1;

    while (yetToDo.size > 0 && steps < MAX_STEPS) {
        const toFlower = yetToDo.values().next().value;
        ++steps;
        const changed = distributeAroundFlower(board, toFlower, yetToDo, exhausted, onMove, onCombo);
        if (changed) {
            redraw();
            await sleep(MOVE_MS);
        } else {
            yetToDo.delete(toFlower);
        }
    }
    
    if (yetToDo.size > 0) {
        redraw();
    }

    // console.log('done');

    if (score.combos === startCombos) {
        score.combos = 0;
    }

    if (isGameOver(board)) {
        window.alert('game over!');
    }

    processing = false;
}

const handleMove = async ([from, to]) => {
    if (processing) return;
    if (from[1] !== 8) return;
    if (to[0] < 1 || to[0] > 4) return;
    if (to[1] < 1 || to[1] > 6) return;

    const nextI = from[0] -1;
    const pos = [
        to[0] - 1,
        to[1] - 1,
    ];

    const newFlower = next[nextI];
    const toCell = board.get(pos);

    if (!newFlower || toCell) return;

    newFlower.setPos(pos);

    board.add(newFlower);
    next.splice(nextI, 1);
    if (next.length === 0) fillNext(next);

    redraw();
    await sleep(MOVE_MS);

    await organizeBoard(newFlower);
}

// 0=down, 1=up, 2=move
const onMouse = (i) => (ev) => {
    const svgEl = vnode.dom;
    const { top, left, width, height } = svgEl.getBoundingClientRect();

    ev.stopPropagation();
    ev.preventDefault();
    
    const e = ev.changedTouches ? ev.changedTouches[0] : ev;
    const xRatio = (e.clientX - left) / width;
    const yRatio = (e.clientY - top)  / height;

    let x = vb[0] + xRatio * vb[2];
    let y = vb[1] + yRatio * vb[3];

    if (i === 0 || i === 1) {
        x = Math.floor(x);
        y = Math.floor(y);

        if (i === 0) {
            const j = x - 1;
            const flower = next[j];
            if (!flower) return;
            moving.flowerId = flower.id;
            moving.pos = [x, y];
        }

        movePositions.push([x, y]);
        if (i === 1) {
            handleMove(movePositions);
            movePositions = [];
            moving.flowerId = undefined;
        }
    }
    else if (moving.flowerId) {
        const now = Date.now();
        if (!moving.now || now - moving.now > DRAG_MS) {
            moving.pos = [x - 0.5, y - 0.5];
            redraw();
            moving.now = now;
        }
    }
};

(async() => {
    m.mount(rootEl, {
        oninit(_vnode) {
            vnode = _vnode;
        },
        view() {
            return m(
                'svg',
                {
                    viewBox: `${vb[0]} ${vb[1]} ${vb[2]} ${vb[3]}`,
                    onmousedown: onMouse(0),
                    onmouseup: onMouse(1),
                    onmousemove: onMouse(2),
                    ontouchstart: onMouse(0),
                    ontouchend: onMouse(1),
                    ontouchmove: onMouse(2),
                },
                [
                    boardView(board, next, score, moving),
                ]
            );
        }
    });

    await sleep(MOVE_MS);
    
    await organizeBoard();
})();
