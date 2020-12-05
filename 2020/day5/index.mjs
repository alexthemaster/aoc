import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

const boardingPasses = input.toString().trim().split('\r\n');

const lowerHalf = 'F';
const upperHalf = 'B';
const columnUpperHalf = 'R';
const columnLowerHalf = 'L';

const rowNumber = 127;
const columnNumber = 7;

let seats = [];

for (const pass of boardingPasses) {
    const row = pass.slice(0, -3);
    const column = pass.slice(-3);

    const rowPosition = processRow(row);
    const columnPosition = processColumn(column);

    const seatID = rowPosition * 8 + columnPosition;

    seats.push(seatID);
}

const highestSeatID = seats.reduce((a, b) => a > b ? a : b);

console.log(`The highest seat ID is ${highestSeatID} (answer for part one)`);

// Part two
let ownSeat;
for (let i = 0; i < seats.length; i++) {
    if (!seats.some(seat => seat == seats[i] + 1) && seats.some(seat => seat == seats[i] + 2)) {
        ownSeat = seats[i] + 1;
        break;
    }
}

console.log(`The ID of your seat is ${ownSeat} (answer for part two)`);

function processRow(row) {
    row = row.split('');
    let rowPosition;
    let range0 = 0;
    let range1 = rowNumber;

    for (const partitioner of row) {
        if (partitioner == lowerHalf) range1 = Math.floor(range1 - ((range1 - range0) / 2));
        if (partitioner == upperHalf) range0 = Math.round((range0 + range1) / 2);
    }

    if (range0 == range1) rowPosition = range0;

    return rowPosition;
}

function processColumn(column) {
    column = column.split('');
    let columnPosition;
    let range0 = 0;
    let range1 = columnNumber;

    for (const partitioner of column) {
        if (partitioner == columnLowerHalf) range1 = Math.floor(range1 - ((range1 - range0) / 2));
        if (partitioner == columnUpperHalf) range0 = Math.round((range0 + range1) / 2);
    }

    if (range0 == range1) columnPosition = range0;

    return columnPosition;
}