const sleepItems = [];

let lastId = 0;

export function sleep(ms) {
    const now = Date.now();
    let resolve;
    const prom = new Promise((resolve_) => { resolve = resolve_; });
    const resolveTime = now + ms;
    sleepItems.push([resolveTime, resolve, ++lastId]);
    return prom;
}

export function tickInterval(resolve, ms = 0) {
    const now = Date.now();
    const resolveTime = now + ms;
    sleepItems.push([resolveTime, resolve, ++lastId, ms]);
    //console.log('created', lastId);
    return lastId;
}

export function abortTickFn(id) {
    //console.log('trying to remove', id);
    for (let i = 0; i < sleepItems.length; ++i) {
        if (sleepItems[i][2] === id) {
            sleepItems.splice(i, 1);
            return;
        }
    }
    //throw 'oops';
}

export function onTickFireSleeps() {
    const now = Date.now();
    for (let i = sleepItems.length - 1; i >= 0; --i) {
        const item = sleepItems[i];
        if (item[0] <= now) {
            const loopMs = item[3];
            if (loopMs !== undefined) {
                item[0] += loopMs;
                if (item[0] < now); // lagging behind, reset delta
                item[0] = now + loopMs;
            } else {
                sleepItems.splice(i, 1);
            }
            item[1]();
        }
    }
}

export function animate(host, name, setter, durationMs) {
    if (host[name]) {
        abortTickFn(host[name]);
    }

    const startT = Date.now();
    const endT = startT + durationMs;

    const fn = () => {
        const now = Date.now();
        const r = (now - startT) / (endT - startT); // [0, 1]

        //console.log(`id:${host.id}, r:${r.toFixed(2)} (${name})`);
        if (r < 1) {
            setter(r);
        } else {
            setter(1);
            abortTickFn(host[name]);
        }
    }

    host[name] = tickInterval(fn);
}
