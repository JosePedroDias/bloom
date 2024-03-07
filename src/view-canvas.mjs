import { times, hsl, lerp, lerp2, nearlyEqual } from './utils.mjs';
import { easeInOutQuad } from './easing.mjs';
import { NUM_COLORS } from './Flower.mjs';
import { NUM_NEXT } from './logic.mjs';
import { Circle, Square, Path, Label } from './canvas.mjs';
import { animate } from './tick-sleep.mjs';

const DEG2RAD = Math.PI / 180;

const STROKE_WIDTH = 0.022;
const CENTER_RADIUS = 0.12;

const TILE_COLORS = ['#EEE', '#CCC'];

const PETAL_PATH = [
    [0.5, 0.5],// bottom

    [0.33, 0.1], // top left
    [0.4, 0.02],
    [0.5, 0  ], // top center
    [0.6, 0.02],
    [0.67, 0.1], // top right
];

const ANIM_MS = 300;

const hues = times(NUM_COLORS).map((i) => i * 360 / NUM_COLORS);
const PETAL_COLORS = hues.map(h => hsl(h, 75, 55));
const PETAL_STROKES = hues.map(h => hsl(h, 75, 0.75 * 55));

const CENTER_FILL = hsl(55, 100, 80);
const CENTER_STROKE = hsl(55, 100, 0.75 * 80);

const views = new Map();
window.views = views;

const trackView = (id, view) => {
    //console.log(`+ ${id}`);
    views.set(id, view);
}

const untrackView = (id) => {
    //console.log(`- ${id}`);
    views.delete(id);
}

export const setupTiles = (board, canvas) => {
    for (const [xi, yi] of board.getPositions()) {
        const pos = [xi + 1.5, yi + 1.5];
        const isDark = (xi + yi) % 2;

        const square = new Square(pos, 1, TILE_COLORS[isDark ? 0 : 1]);
        canvas.squares.add(square);
    }

    for (let i = 0; i < NUM_NEXT; ++i) {
        let pos = [i + 1.5, 8.5];
        const isDark = [pos[0] + pos[1]] % 2;

        const square = new Square(pos, 1, TILE_COLORS[isDark ? 0 : 1]);
        canvas.squares.add(square);
    }
}

export const setupUI = (score, canvas) => {
    const label = new Label([3, 0.5], 'black', '0.4px sans-serif');
    label.setText('0');
    canvas.ui.add(label);
}

export const boardView = (board, next, score, moving, canvas) => {
    const prevViewIds = new Set(views.keys()); // to track what to delete

    const onFlower = (flower, flowerPos, pad) => {
        let flowerView = views.get(flower.id);
        if (!flowerView) {
            flowerView = new Circle(flowerPos, CENTER_RADIUS, CENTER_FILL);
            flowerView.strokeColor = CENTER_STROKE;
            flowerView.strokeWidth = STROKE_WIDTH;

            trackView(flower.id, flowerView);
            canvas.flowers.add(flowerView);
        } else {
            flowerView.pos = flowerPos;
        }
        prevViewIds.delete(flower.id);

        for (const petal of flower.petals) {
            const petalPos = [
                petal.pos[0] + (pad ? 1.5 : 0),
                petal.pos[1] + (pad ? 1.5 : 0),
            ];
            let petalView = views.get(petal.id);
            if (!petalView) {
                petalView = new Path(petalPos, PETAL_PATH, PETAL_COLORS[petal.colorIdx]);
                petalView.angle = petal.angle * DEG2RAD;
                petalView.rotatePos = [0.5, 0.5];
                petalView.strokeColor = PETAL_STROKES[petal.colorIdx];
                petalView.strokeWidth = STROKE_WIDTH;

                trackView(petal.id, petalView);
                canvas.petals.add(petalView);
            } else {
                if (pad && petalView.pos[0] !== petalPos[0] || petalView.pos[1] !== petalPos[1]) {
                    //console.log(`petal pos changed ${petalView.pos.map(n => n.toFixed(2)).join(',')} -> ${petalPos.map(n => n.toFixed(2)).join(',')}`);

                    const setterPos = (r) => petalView.pos = lerp2(petalView.pos, petalPos, easeInOutQuad(r));
                    animate(petal, '_pos', setterPos, ANIM_MS);
                }
                if (pad && !nearlyEqual(petalView.angle, petal.angle * DEG2RAD)) {
                    //console.log(`petal angle changed ${(petalView.angle / DEG2RAD).toFixed(0)} -> ${petal.angle}`);

                    const a1 = petalView.angle;
                    let a2 = DEG2RAD * petal.angle;
                    const setterAngle = (r) => petalView.angle = lerp(a1, a2, easeInOutQuad(r));
                    animate(petal, '_angle', setterAngle, ANIM_MS);
                }

                if (!pad) {
                    petalView.pos = petalPos;
                    petalView.angle = petal.angle * DEG2RAD;
                }
            }
            prevViewIds.delete(petal.id);
        }
    }

    // 1) create/update views

    // board
    for (const [xi, yi] of board.getPositions()) {
        const flower = board.get([xi, yi]);
        if (!flower) continue;
        const flowerPos = [
            xi + 1.5,
            yi + 1.5,
        ];
        onFlower(flower, flowerPos, true);
    }

    // tray
    for (let i = 0; i < NUM_NEXT; ++i) {
        const flower = next[i];
        if (!flower) continue;

        let flowerPos;
        let pad = true;

        if (flower.id === moving.flowerId) {
            const [a, b] = moving.pos;
            flowerPos = [
                a + 0.5,
                b + 0.5,
            ];
            flower.setPos(flowerPos);
            pad = false;
        } else {
            flowerPos = [
                i + 1.5,
                7 + 1.5,
            ];
        }

        onFlower(flower, flowerPos, pad);
    }

    // 2) update ui
    const text = `${score.combos ? score.combos + 'x ' : ''}${score.points}`;
    canvas.ui.children[0].setText(text);

    // 3) remove stale views
    for (const id of prevViewIds) {
        const o = views.get(id);
        canvas.remove(o);
        untrackView(id);
    }
}
