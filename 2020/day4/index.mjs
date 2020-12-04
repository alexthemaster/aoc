import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const input = await readFile(join(dirname(fileURLToPath(import.meta.url)), '/input.txt'));
if (!input || input.toString().trim().length < 1) throw 'No input file found.';

// Thanks Vasiliy for the regex https://stackoverflow.com/a/37513639
const passports = input.toString().trim().split(/\n\s*\n/).map(passport => passport.replace(/\r/g, '').replace(/\n/g, ' '));

// Thanks Royi for the regex https://stackoverflow.com/a/8027444
const hexRegex = /^#[0-9A-F]{6}$/i;

let validPassports = 0;

for (const passport of passports) {
    const [birthYear, issueYear, expirationYear, height, hairColor, eyeColor, passportID] = getInfo(passport);

    if (!birthYear || !issueYear || !expirationYear || !height || !hairColor || !eyeColor || !passportID) continue;
    validPassports++;
}

console.log(`Valid passports for part one: ${validPassports}`);

// Part two
validPassports = 0;

const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

for (const passport of passports) {
    const [birthYear, issueYear, expirationYear, height, hairColor, eyeColor, passportID] = getInfo(passport);

    if (!birthYear || !issueYear || !expirationYear || !height || !hairColor || !eyeColor || !passportID) continue;

    if (
        (birthYear >= 1920 && birthYear <= 2002) &&
        (issueYear >= 2010 && issueYear <= 2020) &&
        (expirationYear >= 2020 && expirationYear <= 2030) &&
        (height.endsWith('cm') ? parseInt(height) >= 150 && parseInt(height) <= 193 : parseInt(height) >= 59 && parseInt(height) <= 76) &&
        (hexRegex.test(hairColor)) &&
        (validEyeColors.some(color => color == eyeColor)) &&
        (!isNaN(passportID) && passportID.length == 9)
    ) validPassports++;
}

console.log(`Valid passports for part two: ${validPassports}`);


function getInfo(passport) {
    const birthYear = parseInfo(passport, 'byr:');
    const issueYear = parseInfo(passport, 'iyr:');
    const expirationYear = parseInfo(passport, 'eyr:');
    const height = parseInfo(passport, 'hgt:');
    const hairColor = parseInfo(passport, 'hcl:');
    const eyeColor = parseInfo(passport, 'ecl:');
    const passportID = parseInfo(passport, 'pid:');

    return [birthYear, issueYear, expirationYear, height, hairColor, eyeColor, passportID];
}

function parseInfo(passport, ab) {
    return passport.includes(ab) ? passport.split(ab)[1].split(' ')[0] : null;
}