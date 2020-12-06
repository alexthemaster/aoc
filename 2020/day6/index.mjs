import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

// Thanks Vasiliy for the regex https://stackoverflow.com/a/37513639
const answers = input.toString().trim().split(/\n\s*\n/).map(answer => answer.replace(/\r/g, '').replace(/\n/g, ' '));

let sum = 0;

for (let answer of answers) {
    // We create a new Set and then convert it back to an array to remove duplicate letters
    answer = [...new Set(answer.split(''))].filter(answer => answer !== ' ');
    sum += answer.length;
}

console.log(`The sum of the counts is ${sum} (answer for part one)`);

// Part two
sum = 0;
const answers2 = answers.map(answer => answer.split(' '));

// I fucking give up on this for now

// console.log(`The sum of the other count is ${sum} (answer for part two)`);