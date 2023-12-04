import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  const cardData = data.map(gameString => gameString.split(':')[1]);
  cardData.forEach(game => (value += getGameValue(game)));
  return value;
}

function getGameValue(game: string): number {
  let value = 0;
  const gameValues = game.split('|');
  const winningNumbers = gameValues[0]
    .trim()
    .split(' ')
    .filter(value => !!value);
  const gameNumbers = gameValues[1]
    .trim()
    .split(' ')
    .filter(value => !!value);

  winningNumbers.forEach(number => {
    if (gameNumbers.includes(number)) value = !value ? 1 : value * 2;
  });
  return value;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
