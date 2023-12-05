import { readData } from '../../shared.ts';
import chalk from 'chalk';

const totalCards: number[] = [];

export async function day4b(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  const cardData = data.map(gameString => gameString.split(':')[1]);
  cardData.forEach(() => totalCards.push(1));
  cardData.forEach((game, index) => getScratchCards(game, index));
  value = addScratchCards();
  return value;
}

function getScratchCards(game: string, index: number): void {
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
    if (gameNumbers.includes(number)) value++;
  });
  for (let i = index + 1; i < index + value + 1; ++i) {
    totalCards[i] += totalCards[index];
  }
}

const addScratchCards = (): number => totalCards.reduce((a, b) => a + b, 0);

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
