import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  data.forEach(textLine => {
    const numbers = textLine.replace(/[^0-9]/g, '');
    value += parseInt(numbers[0] + numbers[numbers.length - 1]);
  });

  return value;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
