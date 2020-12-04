import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

const passwords = input.toString().trim().split('\r\n');

let valid = 0;

for (const password of passwords) {
    const minimum = password.split('-')[0];
    const maximum = password.split('-')[1].split(' ')[0];
    const letter = password.split(' ')[1].split(':')[0];
    const currentPassord = password.split(': ')[1];

    if (!currentPassord.includes(letter)) continue;
    const charArray = currentPassord.split('').filter(character => character == letter);
    if (charArray.length > maximum || charArray.length < minimum) continue;
    valid += 1;
}

console.log(`Valid number of passwords for part one: ${valid}`)

// Part two
valid = 0;

for (const password of passwords) {
    const index1 = password.split('-')[0] - 1;
    const index2 = password.split('-')[1].split(' ')[0] - 1;
    const letter = password.split(' ')[1].split(':')[0];
    const currentPassord = password.split(': ')[1];

    if (!currentPassord.includes(letter)) continue;
    if (currentPassord[index1] !== letter && currentPassord[index2] !== letter) continue;
    if (currentPassord[index1] === letter && currentPassord[index2] === letter) continue;
    valid += 1;
}

console.log(`Valid number of passwords for part two: ${valid}`)
