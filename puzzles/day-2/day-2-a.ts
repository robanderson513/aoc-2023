import { readData } from '../../shared.ts';
import chalk from 'chalk';

const cubeBag = { red: 12, green: 13, blue: 14 };

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  let value = 0;

  data.forEach(textLine => {
    const gameValues = textLine.split(':');
    const isPossible = checkPossibility(gameValues[1]);

    if (isPossible) {
      value += parseInt(gameValues[0].replace('Game ', ''));
    }
  });
  return value;
}

function checkPossibility(cubeString: string): boolean {
  const sets = cubeString.replace(/ /g, '').split(/[;,]/);
  return sets.every(evaluateCubes);
}

const evaluateCubes = (cube: string): boolean => {
  if (cube.includes('red')) {
    return cubeBag.red >= parseInt(cube.replace('red', ''));
  } else if (cube.includes('green')) {
    return cubeBag.green >= parseInt(cube.replace('green', ''));
  } else if (cube.includes('blue')) {
    return cubeBag.blue >= parseInt(cube.replace('blue', ''));
  }
};

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
