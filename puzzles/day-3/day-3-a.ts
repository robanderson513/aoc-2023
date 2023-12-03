import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  data.forEach((lineData, index) => {
    for (let i = 0; i < lineData.length; i++) {
      if (lineData[i].match(/\d+/)) {
        const partNumber = getPartNumber(i, lineData);
        const partIndexes = getPartIndexes(i, lineData.length - 1, partNumber.length);

        const isValid = validatePartNumber(data, index, partIndexes);
        if (isValid) value += parseInt(partNumber);

        i += partNumber.length - 1;
      }
    }
  });
  return value;
}

function getPartNumber(index: number, lineData: string): string {
  let partIndex = index;
  let partNumber = '';
  let isCreating = true;

  while (isCreating) {
    partNumber += lineData[partIndex];
    partIndex++;
    isCreating = !!lineData[partIndex] && !!lineData[partIndex].match(/\d+/);
  }

  return partNumber;
}

function getPartIndexes(initialIndex: number, finalIndex: number, partLength: number): number[] {
  const startIndex = initialIndex ? initialIndex - 1 : 0;
  const partIndex = initialIndex + partLength;
  const endIndex = partIndex < finalIndex ? partIndex : finalIndex;

  return [startIndex, endIndex];
}

function validatePartNumber(data: string[], lineIndex: number, partIndexes: number[]): boolean {
  const firstIndex = partIndexes[0];
  const lastIndex = partIndexes[1];
  let isValid = false;

  if (lineIndex) {
    isValid = hasValues(data[lineIndex - 1], firstIndex, lastIndex);
  }
  if (isValid) return isValid;

  isValid = hasValues(data[lineIndex], firstIndex) || hasValues(data[lineIndex], lastIndex);
  if (isValid) return isValid;

  if (lineIndex + 1 < data.length - 1) {
    isValid = hasValues(data[lineIndex + 1], firstIndex, lastIndex);
  }
  return isValid;
}

const hasValues = (lineData: string, firstIndex: number, lastIndex?: number): boolean =>
  !!lineData.substring(firstIndex, (lastIndex ?? firstIndex) + 1).match(/[^0-9.]+/);

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
