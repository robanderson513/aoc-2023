import { readData } from '../../shared.ts';
import chalk from 'chalk';

const gearSymbol = '*';

export async function day3b(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  data.forEach((lineData, index) => {
    for (let i = 0; i < lineData.length; i++) {
      if (lineData[i] === gearSymbol) {
        const gearValue = findGearValues(i, index, data);
        if (gearValue) value += gearValue;
      }
    }
  });

  return value;
}

let part1: string;
let part2: string;
let startIndex: number;
let endIndex: number;

function findGearValues(gearIndex: number, lineIndex: number, data: string[]): number {
  const maxIndex = data[lineIndex].length - 1;
  part1 = part2 = '';
  startIndex = gearIndex ? gearIndex - 1 : 0;
  endIndex = gearIndex < maxIndex ? gearIndex + 1 : maxIndex;

  if (lineIndex) {
    const previousLine = data[lineIndex - 1];
    checkAdjacentLines(previousLine, gearIndex, true);
  }

  if (data[lineIndex][startIndex].match(/\d/)) {
    const partNumber = getPartNumber(startIndex, data[lineIndex]);
    !part1 ? (part1 = partNumber) : (part2 = partNumber);
  }

  if (data[lineIndex][endIndex].match(/\d/)) {
    const partNumber = getPartNumber(endIndex, data[lineIndex]);
    !part1 ? (part1 = partNumber) : (part2 = partNumber);
  }

  if (lineIndex + 1 <= maxIndex) {
    const nextLine = data[lineIndex + 1];
    checkAdjacentLines(nextLine, gearIndex, false);
  }
  return part1 && part2 ? parseInt(part1) * parseInt(part2) : null;
}

function checkAdjacentLines(lineData: string, gear: number, previous: boolean): void {
  if (lineData.substring(startIndex, endIndex + 1).match(/\d/))
    if (hasDoubleValues(lineData, startIndex, gear, endIndex)) {
      part1 = getPartNumber(startIndex, lineData);
      part2 = getPartNumber(endIndex, lineData);
    } else {
      previous ? (part1 = getPartNumber(gear, lineData)) : (part2 = getPartNumber(gear, lineData));
    }
}

function getPartNumber(index: number, lineData: string): string {
  let partNumber = '';
  if (lineData[index].match(/\d/)) partNumber = lineData[index];

  partNumber += buildPartNumber(index, lineData, true);
  partNumber = buildPartNumber(index, lineData, false) + partNumber;

  return partNumber;
}

function buildPartNumber(index: number, lineData: string, increment: boolean): string {
  let partNumber = '';
  let isCreating = true;
  while (isCreating) {
    index += increment ? 1 : -1;
    isCreating = !!lineData[index] && !!lineData[index].match(/\d/);
    if (isCreating)
      increment ? (partNumber += lineData[index]) : (partNumber = lineData[index] + partNumber);
  }
  return partNumber;
}

//Checks for multiple values on a single line separated by another character
const hasDoubleValues = (line: string, start: number, gear: number, end: number): boolean =>
  !!line[start].match(/\d/) && !!line[gear].match(/[^\d]/) && !!line[end].match(/\d/);

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
