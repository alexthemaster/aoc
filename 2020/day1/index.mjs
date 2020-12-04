import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

const expenseReport = input.toString().trim().split('\r\n').map(e => Number(e));

let number1, number2, number3;

for (let i = 0; i < expenseReport.length; i++) {
    for (let j = 0; j < expenseReport.length; j++) {
        if (expenseReport[i] + expenseReport[j] == 2020) {
            number1 = expenseReport[i];
            number2 = expenseReport[j];
            break;
        }
    }
}

console.log('Part one:', number1 * number2);

// Part two
for (let i = 0; i < expenseReport.length; i++) {
    for (let j = 0; j < expenseReport.length; j++) {
        for (let k = 0; k < expenseReport.length; k++) {
            if (expenseReport[i] + expenseReport[j] + expenseReport[k] == 2020) {
                number1 = expenseReport[i];
                number2 = expenseReport[j];
                number3 = expenseReport[k];
                break;
            }
        }
    }
}

console.log('Part two:', number1 * number2 * number3);