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

function findGearValues(gearIndex: number, lineIndex: number, data: string[]): number {
  let part1: string;
  let part2: string;
  const maxIndex = data[lineIndex].length - 1;
  const startIndex = gearIndex ? gearIndex - 1 : 0;
  const endIndex = gearIndex < maxIndex ? gearIndex + 1 : maxIndex;

  //previous line
  if (lineIndex) {
    const previousLine = data[lineIndex - 1];
    const searchString = previousLine.substring(startIndex, endIndex + 1);
    if (searchString.match(/\d/)) {
      //checks for two on the same line, else gets the single value
      if (
        previousLine[startIndex].match(/\d/) &&
        previousLine[gearIndex].match(/[^\d]/) &&
        previousLine[endIndex].match(/\d/)
      ) {
        part1 = getPartNumber(startIndex, previousLine);
        part2 = getPartNumber(endIndex, previousLine);
      } else {
        const partNumber = getPartNumber(gearIndex, previousLine);
        part1 = partNumber;
      }
    }
  }

  if (data[lineIndex][startIndex].match(/\d/)) {
    const partNumber = getPartNumber(startIndex, data[lineIndex]);
    if (!part1) {
      part1 = partNumber;
    } else if (!part2) {
      part2 = partNumber;
    }
  }

  if (data[lineIndex][endIndex].match(/\d/)) {
    const partNumber = getPartNumber(endIndex, data[lineIndex]);
    if (!part1) {
      part1 = partNumber;
    } else if (!part2) {
      part2 = partNumber;
    }
  }

  if (lineIndex + 1 <= maxIndex) {
    const nextLine = data[lineIndex + 1];
    const searchString = nextLine.substring(startIndex, endIndex + 1);
    if (searchString.match(/\d/)) {
      if (
        nextLine[startIndex].match(/\d/) &&
        nextLine[gearIndex].match(/[^\d]/) &&
        nextLine[endIndex].match(/\d/)
      ) {
        part1 = getPartNumber(startIndex, nextLine);
        part2 = getPartNumber(endIndex, nextLine);
      } else {
        const partNumber = getPartNumber(gearIndex, nextLine);
        if (!part2) part2 = partNumber;
      }
    }
  }
  if (part1 && part2) {
    console.log(part1, part2);
  }
  return part1 && part2 ? parseInt(part1) * parseInt(part2) : null;
}

function getPartNumber(index: number, lineData: string): string {
  let partIndex = index;
  let partNumber = '';

  if (lineData[index].match(/\d/)) partNumber = lineData[index];

  let isCreating = true;
  while (isCreating) {
    partIndex++;
    isCreating = !!lineData[partIndex] && !!lineData[partIndex].match(/\d/);
    if (isCreating) partNumber += lineData[partIndex];
  }
  isCreating = true;
  partIndex = index;
  while (isCreating) {
    partIndex--;
    isCreating = !!lineData[partIndex] && !!lineData[partIndex].match(/\d/);
    if (isCreating) partNumber = lineData[partIndex] + partNumber;
  }

  return partNumber;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
