// https://github.com/AndrewRayCode/easing-utils/blob/master/src/easing.js

export const linear = (r) => r;

export const easeInSine = (r) =>
  -1 * Math.cos(r * (Math.PI / 2)) + 1;
export const easeOutSine = (r) => Math.sin(r * (Math.PI / 2));
export const easeInOutSine = (r) =>
  -0.5 * (Math.cos(Math.PI * r) - 1);

export const easeInQuad = (r) => r * r;
export const easeOutQuad = (r) => r * (2 - r);
export const easeInOutQuad = (r) =>
  r < 0.5 ? 2 * r * r : -1 + (4 - 2 * r) * r;

export const pingPongFactory = (intFn) => (r) =>
  intFn(r < 0.5 ? 2 * r : 1 - 2 * (r - 0.5));

export const rgb2num = ([r, g, b]) =>
  (r << 16) | (g << 8) | b;
export const num2rgb = (num) => [
  (num >> 16) & 0xff,
  (num >> 8) & 0xff,
  num & 0xff,
];

export function addAnimation(
  context,
  durationSecs,
  updaterFn,
  intFn = linear,
  delaySecs = 0,
  name,
) {
  if (name) {
    const idx = context.animations.findIndex((anim) => anim.name === name);
    if (idx !== -1) context.animations.splice(idx, 1);
  }

  context.animations.push({
    startT: 0,
    endT: durationSecs,
    t: -delaySecs,
    attributes: [
      {
        interpolationFn: intFn,
        updaterFn,
      },
    ],
    name: name,
  });
}

export function processTick(context, dt) {
  for (let animIdx = context.animations.length - 1; animIdx >= 0; --animIdx) {
    const anim = context.animations[animIdx];
    anim.t = Math.min(anim.endT, anim.t + dt);

    const r = (anim.t - anim.startT) / (anim.endT - anim.startT);

    for (const attr of anim.attributes) {
      attr.updaterFn(attr.interpolationFn(r));
    }

    if (anim.t === anim.endT) {
      /* console.warn(
        "removing animation",
        context.animations[animIdx],
        "from",
        context
      ); */
      context.animations.splice(animIdx, 1);
    }
  }
}
