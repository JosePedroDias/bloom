const sleepItems = [];

export function sleep(ms) {
    const now = Date.now();
    let resolve;
    const prom = new Promise((resolve_) => { resolve = resolve_; });
    const resolveTime = now + ms;
    sleepItems.push([resolveTime, resolve]);
    return prom;
}

export function tickInterval(resolve, ms) {
    const now = Date.now();
    const resolveTime = now + ms;
    sleepItems.push([resolveTime, resolve, ms]);
}

export function onTickFireSleeps() {
    const now = Date.now();
    for (let i = sleepItems.length - 1; i >= 0; --i) {
        const item = sleepItems[i];
        if (item[0] <= now) {
            const loopMs = item[2];
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
