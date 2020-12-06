import { performance } from 'perf_hooks';

import { day1 } from './day1/index.mjs';
import { day2 } from './day2/index.mjs';
import { day3 } from './day3/index.mjs';
import { day4 } from './day4/index.mjs';
import { day5 } from './day5/index.mjs';
import { day6 } from './day6/index.mjs';

const days = [day1, day2, day3, day4, day5, day6];
let timeTotal = 0;
const results = {};

for (const run of days) {
    const timeStart = performance.now();
    const answers = run();
    const timeEnd = performance.now();

    const name = run.name[0].toUpperCase() + run.name.slice(1, -1) + ' ' + run.name.slice(-1);

    const time = timeEnd - timeStart;
    timeTotal += time;
    results[name] = { Time: `${(time).toPrecision(3)}ms`, Answers: answers };
};

results[''] = {};
results['Total Time'] = { Time: timeTotal.toPrecision(3) + 'ms' }

console.table(results);
