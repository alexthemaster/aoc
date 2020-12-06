import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

// Thanks Vasiliy for the regex https://stackoverflow.com/a/37513639
const totalAnswers = input.toString().trim().split(/\n\s*\n/).map(answer => answer.replace(/\r/g, '').replace(/\n/g, ' '));

export function day6() {
    let sum = 0;

    for (let groupAnswers of totalAnswers) {
        // We create a new Set and then convert it back to an array to remove duplicate letters
        groupAnswers = [...new Set(groupAnswers.split(''))].filter(answer => answer !== ' ');
        sum += groupAnswers.length;
    }

    const partOne = sum;

    // Part two
    sum = 0;
    const answers2 = totalAnswers.map(answer => answer.split(' '));

    for (const groupAnswers of answers2) {
        const groupSize = groupAnswers.length;
        if (groupSize == 1) { sum += groupAnswers[0].split('').length; continue; }

        const totalAnswers = {};
        groupAnswers.forEach(answers => {
            answers = answers.split('');
            answers.map(answer => {
                if (!totalAnswers[answer]) totalAnswers[answer] = 0;
                totalAnswers[answer]++;
            })
        });

        for (const answer in totalAnswers) {
            if (totalAnswers[answer] == groupSize) sum += 1
        }
    }

    const partTwo = sum;

    return { partOne, partTwo };
}