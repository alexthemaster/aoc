import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

const tree = '#';

const slopesToCheck = [[3, 1], [1, 1], [5, 1], [7, 1], [1, 2]];

export function day3() {
    let first = true;
    let partOne;

    const encounteredTreesPerSlope = [];

    for (const slope of slopesToCheck) {
        const rows = input.toString().trim().split('\r\n');
        const toAdd = slope[0];

        let position = 0;
        let encounteredTrees = 0;

        while (rows.length) {
            let row = rows[0].split('');

            if (position > row.length - 1) position = position - row.length;
            if (row[position] === tree) encounteredTrees++;

            position += toAdd;

            if (slope[1] == 2) rows.shift();
            rows.shift();
        };

        encounteredTreesPerSlope.push(encounteredTrees);

        if (first) {
            partOne = encounteredTrees;
            first = false;
        }
    };

    const partTwo = encounteredTreesPerSlope.reduce((a, b) => a * b);

    return { partOne, partTwo };
}