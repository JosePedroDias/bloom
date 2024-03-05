import { default as m } from '../vendor/mithril.mjs';

import { hsl, times } from './utils.mjs';
import { NUM_COLORS, NUM_NEXT } from './logic.mjs';

const STROKE_WIDTH = 0.018;
const CENTER_RADIUS = 0.12;

export const TILE_COLORS = ['#EEE', '#CCC'];

//const PETAL_SHAPE = `M 0.5 0.5 L 0.3 0.1 C 0.4333 0 0.5667 0 0.7 0.1 Z`;
const PETAL_SHAPE = `M 0.5 0.5 C 0.4333 0.3667 0.302 0.236 0.333 0.093 C 0.354 -0.004 0.648 -0.006 0.663 0.096 C 0.683 0.248 0.5667 0.3667 0.5 0.5`;

const hues = times(NUM_COLORS).map((i) => i * 360 / NUM_COLORS);
export const PETAL_COLORS = hues.map(h => hsl(h, 75, 55));
export const PETAL_STROKES = hues.map(h => hsl(h, 75, 0.75 * 55));

const CENTER_FILL = hsl(55, 100, 80);
const CENTER_STROKE = hsl(55, 100, 0.75 * 80);

const tileView = ([x, y], isDark) => {
    return m('rect', {
        key: x + y * 100,
        id: `tile-${x}-${y}`,
        x,
        y,
        width: 1,
        height: 1,
        fill: TILE_COLORS[isDark ? 1 : 0],
    });
}

const onbeforeremove = (vnode) => {
    vnode.dom.classList.add('leave');
    return new Promise((resolve) => vnode.dom.addEventListener('animationend', resolve));
}

const petalView = (petal, [dx, dy] = [0, 0]) => {
    const fill = PETAL_COLORS[petal.colorIdx];
    const stroke = PETAL_STROKES[petal.colorIdx];
    const [x, y] = petal.pos;
    return m(
        'path.enter',
        {
            key: petal.id,
            id: `petal-${petal.id}`,
            transform: `translate(${x + dx}, ${y + dy}) rotate(${petal.angle} 0.5 0.5)`,
            d: PETAL_SHAPE,
            fill,
            stroke,
            'stroke-width': STROKE_WIDTH,
            onbeforeremove,
        },
    );
}

const flowerView = (flower, [dx, dy] = [0, 0]) => {
    const [x, y] = flower.pos;
    return m(
        'circle.enter',
        {
            key: flower.id,
            id: `flower-${flower.id}`,
            transform: `translate(${x + dx}, ${y + dy})`,
            cx: 0.5,
            cy: 0.5,
            r: CENTER_RADIUS,
            fill: CENTER_FILL,
            stroke: CENTER_STROKE,
            'stroke-width': STROKE_WIDTH,
            onbeforeremove,
        },
    );
}

const scoreView = (score) => {
    const label = `${score.combos ? score.combos + 'x ' : ''}${score.points}`;
    return m('text', {
        key: 'score',
        x: 3,
        y: 0.5,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': 0.4,
    }, label);
}

export const boardView = (board, next, score) => {
    //const t = Date.now() / 1000; console.log(`redraw ${t % 100}`);

    const tiles = [];
    const flowers = [];
    const petals = [];
    const boardDelta = [1, 1];
    
    for (const [xi, yi] of board.getPositions()) {
        const pos = [xi + 1, yi + 1];
        const isDark = (xi + yi) % 2;

        tiles.push(tileView(pos, isDark));

        const flower = board.get([xi, yi]);
        if (flower) {
            flowers.push(flowerView(flower, boardDelta));
            for (const petal of flower.petals) {
                petals.push(petalView(petal, boardDelta));
            }
        }
    }

    for (let i = 0; i < NUM_NEXT; ++i) {
        const flower = next[i];
        if (flower) {
            const nextDelta = [1 + i, 8];
            flowers.push(flowerView(flower, nextDelta));
            for (const petal of flower.petals) {
                petals.push(petalView(petal, nextDelta));
            }
        }
    }

    return [
        ...tiles,
        ...petals,
        ...flowers,
        scoreView(score),
    ];
}
