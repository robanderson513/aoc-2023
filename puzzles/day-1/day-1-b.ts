import { readData } from '../../shared.ts';
import chalk from 'chalk';

const dictionary = [
  { string: 'one', number: '1' },
  { string: 'two', number: '2' },
  { string: 'three', number: '3' },
  { string: 'four', number: '4' },
  { string: 'five', number: '5' },
  { string: 'six', number: '6' },
  { string: 'seven', number: '7' },
  { string: 'eight', number: '8' },
  { string: 'nine', number: '9' }
];

export async function day1b(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  data.forEach(textLine => {
    const firstValue = getValue(textLine, true);
    const lastValue = getValue(textLine, false);
    value += parseInt(firstValue + lastValue);
  });

  return value;
}

function getValue(textLine: string, firstValue: boolean) {
  let value: string;
  let index: number;

  dictionary.forEach(item => {
    const stringIndex = firstValue
      ? textLine.indexOf(item.string)
      : textLine.lastIndexOf(item.string);

    const numberIndex = firstValue
      ? textLine.indexOf(item.number)
      : textLine.lastIndexOf(item.number);

    if (firstValue) {
      if (stringIndex !== -1 && (stringIndex < index || index === undefined)) {
        value = item.number;
        index = stringIndex;
      }
      if (numberIndex !== -1 && (numberIndex < index || index === undefined)) {
        value = item.number;
        index = numberIndex;
      }
    } else {
      if (stringIndex !== -1 && (stringIndex > index || index === undefined)) {
        value = item.number;
        index = stringIndex;
      }
      if (numberIndex !== -1 && (numberIndex > index || index === undefined)) {
        value = item.number;
        index = numberIndex;
      }
    }
  });
  return value;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
