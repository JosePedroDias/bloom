import { getState, distributeAroundFlower, fillNext, isNextEmpty, isGameOver } from './logic.mjs';
import { setupTiles, setupUI, boardView } from './view-canvas.mjs';
import { Canvas, Group } from './canvas.mjs';
import { sleep, onTickFireSleeps } from './tick-sleep.mjs';

const CW = 6;
const CH = 10;

const MOVE_MS = 310;
const DRAG_MS = 1000 / 20;

const MAX_STEPS = 30;

let canvas;
let redraw;
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
    if (processing || !from || !to) return;
    if (from[1] !== 8) return;

    const nextI = from[0] -1;
    if (to[0] < 1 || to[0] > 4 || 
        to[1] < 1 || to[1] > 6) {
        console.log('TODO FIX REWIND');
        const flower = next[nextI];
        const from2 = [nextI, 7];
        console.log({from: from.join(','), from2: from2.join(',')});
        flower.setPos(from2);
        flower.pos = Array.from(from);
        redraw();
        return;
    }

    const pos = [
        to[0] - 1,
        to[1] - 1,
    ];

    const newFlower = next[nextI];
    const toCell = board.get(pos);

    if (!newFlower || toCell) return;

    newFlower.setPos(pos);

    board.add(newFlower);
    next[nextI] = undefined;
    if (isNextEmpty(next)) fillNext(next);

    redraw();
    await sleep(MOVE_MS);

    await organizeBoard(newFlower);
}

// 0=down, 1=up, 2=move
const onMouse = (i) => (ev) => {
    const canvasEl = canvas.el;
    const { top, left, width, height } = canvasEl.getBoundingClientRect();

    ev.stopPropagation();
    ev.preventDefault();
    
    const e = ev.changedTouches ? ev.changedTouches[0] : ev;
    const xRatio = (e.clientX - left) / width;
    const yRatio = (e.clientY - top)  / height;

    let x = xRatio * CW;
    let y = yRatio * CH;

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
    canvas = new Canvas([CW, CH], 50, true, true);
    const el = canvas.el;

    el.addEventListener('mousedown',  onMouse(0));
    el.addEventListener('mouseup',    onMouse(1));
    el.addEventListener('mousemove',  onMouse(2));

    el.addEventListener('touchstart', onMouse(0));
    el.addEventListener('touchend',   onMouse(1));
    el.addEventListener('touchmove',  onMouse(2));

    const squaresLay = new Group();
    const petalsLay = new Group();
    const flowersLay = new Group();
    const uiLay = new Group();

    canvas.add(squaresLay);
    canvas.add(petalsLay);
    canvas.add(flowersLay);
    canvas.add(uiLay);

    canvas.squares = squaresLay;
    canvas.flowers = flowersLay;
    canvas.petals  = petalsLay;
    canvas.ui      = uiLay;

    setupTiles(board, canvas);

    setupUI(score, canvas);

    redraw = () => {
        boardView(board, next, score, moving, canvas);
    };
    redraw();

    await sleep(MOVE_MS);
    
    await organizeBoard();
})();

///////

let running = true;
let gameT = 0;
let speedMultiplier = 1;
let tPrev = -1 / 60;
function onTick(t) {
    requestAnimationFrame(onTick);

    if (!canvas || !running) return;

    t = t / 1000;

    let dt = t - tPrev;
    if (dt > 1) dt = 1 / 60; // cap max read DT if above 1 sec (assume coming from background)

    dt *= speedMultiplier;

    gameT += dt;

    document.title = `fps: ${(1 / dt).toFixed(0)} speed: ${speedMultiplier.toFixed(2)}x | bloom`;

    onTickFireSleeps();

    canvas.drawFrame();

    tPrev = t;
}

onTick(0);

document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    console.log(`running: ${running}`);
});

document.addEventListener('keydown', (ev) => {
    if (ev.key === '1') speedMultiplier = 1/9;
    if (ev.key === '2') speedMultiplier = 1/3;
    if (ev.key === '3') speedMultiplier = 1;
    if (ev.key === '4') speedMultiplier = 3;
    if (ev.key === '5') speedMultiplier = 9;
    else return;
    ev.preventDefault();
    ev.stopPropagation();
});
