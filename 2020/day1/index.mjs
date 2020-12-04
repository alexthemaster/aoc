/*
--- Day 1: Report Repair ---
After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

To save your vacation, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
*/

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

/*
--- Part Two ---
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

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