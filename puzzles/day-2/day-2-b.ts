import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  const gameSets = data.map(games => games.split(':')[1].replace(/ /g, ''));
  gameSets.forEach(gameValues => (value += getCubeValues(gameValues)));

  return value;
}

function getCubeValues(gameValues: string): number {
  let redValue: number;
  let greenValue: number;
  let blueValue: number;
  const cubeValues = gameValues.split(/[;,]/);

  cubeValues.forEach(value => {
    if (value.includes('red')) {
      const rollValue = parseInt(value.replace('red', ''));
      if (!redValue || rollValue > redValue) redValue = rollValue;
    } else if (value.includes('green')) {
      const rollValue = parseInt(value.replace('green', ''));
      if (!greenValue || rollValue > greenValue) greenValue = rollValue;
    } else if (value.includes('blue')) {
      const rollValue = parseInt(value.replace('blue', ''));
      if (!blueValue || rollValue > blueValue) blueValue = rollValue;
    }
  });

  return redValue * greenValue * blueValue;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
