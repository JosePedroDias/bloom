export function zip2(arr1, arr2) {
    if (arr1.length !== arr2.length) throw new Error('arrays must be of the same length!');
    return arr1.map((el1, i1) => [el1, arr2[i1]]);
}

export const times = (n, delta = 0) => {
    return new Array(n).fill(true).map((_, i) => i + delta);
}

export function combination2(n) {
    const res = [];
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (i === j) continue;
            res.push([j, i]);
        }
    }
    return res;
}

export const transpose = (arr) => arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));

export const randInt = (n) => Math.floor(n * Math.random());

export const randFromArray = (arr) => arr[randInt(arr.length)];

export const allIndicesHaving = (arr, v) => arr.map((_, i) => v === arr[i] ? i : undefined).filter((v) => v !== undefined);

export const unique = (arr) => Array.from(new Set(arr));

export function shuffleInPlace(arr) {
    let m = arr.length;
    let t;
    while (m) {
        const i = randInt(0, m - 1);
        --m;
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// h: 0-360, s: 0-100, l: 0-100
export const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function randString(n = 5) {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += ALPHABET[randInt(ALPHABET.length)];
    }
    return str;
}

let lastInt = 0;
export function uniqueInt() {
    return ++lastInt;
}

export function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

export function toPolar([x, y]) {
    const r = Math.sqrt(x * x + y * y);
    const theta = Math.atan2(y, x);
    return [r, theta];
}

export function fromPolar([r, theta]) {
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

export function lerp(a, b, r) {
    return (1 - r) * a + r * b;
}

export function lerp2(a, b, r) {
    const r_ = 1 - r;
    return [
        r_ * a[0] + r * b[0],
        r_ * a[1] + r * b[1],
    ];
}

export function pingPongRatio(ratio) {
    if (ratio < 0.5) {
        return ratio * 2;
    }
    return 1 - (ratio - 0.5) * 2;
}

export function nearlyEqual(a, b, epsilon = 0.001) {
    return Math.abs(a - b) < epsilon;
}
