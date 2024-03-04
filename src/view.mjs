import { default as m } from '../vendor/mithril.mjs';

export const PETAL_COLORS = ['#D22', '#2D2', '#22D', '#DD2', '#D82', '#D2D'];
export const TILE_COLORS = ['#EEE', '#CCC'];

import { NUM_NEXT } from './logic.mjs';

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
    const [x, y] = petal.pos;
    return m(
        'path.enter',
        {
            key: petal.id,
            id: `petal-${petal.id}`,
            transform: `translate(${x + dx}, ${y + dy}) rotate(${petal.angle} 0.5 0.5)`,
            d: 'M 0.5 0.5 L 0.3 0.1 C 0.4333 0 0.5667 0 0.7 0.1 Z',
            fill,
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
            r: 0.12,
            fill: 'yellow',
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
