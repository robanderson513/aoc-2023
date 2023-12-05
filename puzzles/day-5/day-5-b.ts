import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);

  let value = 0;

  const dataMaps = data.join('|').split('||');
  const seedRanges = getSeedRanges(dataMaps[0].split('seeds: ')[1].split(' '));
  const soilMap = parseMapping(dataMaps[1]);
  const fertilizerMap = parseMapping(dataMaps[2]);
  const waterMap = parseMapping(dataMaps[3]);
  const lightMap = parseMapping(dataMaps[4]);
  const temperatureMap = parseMapping(dataMaps[5]);
  const humidityMap = parseMapping(dataMaps[6]);
  const locationMap = parseMapping(dataMaps[7]);

  seedRanges.forEach(seed => {
    console.log(seed, value);
    const seeds = generateSeeds(seed.start, seed.start + seed.range);

    for (let i = 0; i < seed.range; i++) {
      const seedValue = seeds.next().value as number;
      const soilValue = getMappingValue(seedValue, soilMap);
      const fertilizerValue = getMappingValue(soilValue, fertilizerMap);
      const waterValue = getMappingValue(fertilizerValue, waterMap);
      const lightValue = getMappingValue(waterValue, lightMap);
      const tempValue = getMappingValue(lightValue, temperatureMap);
      const humidityValue = getMappingValue(tempValue, humidityMap);
      const locationValue = getMappingValue(humidityValue, locationMap);

      if (!value) {
        value = locationValue;
      } else if (locationValue < value) {
        value = locationValue;
      }
    }
  });

  return value;
}

function getSeedRanges(seeds: string[]): { start: number; range: number }[] {
  const seedRanges = [];

  seeds.forEach((seed, index) => {
    if (index % 2 == 0) {
      const seedNumber = parseInt(seed);
      const range = parseInt(seeds[index + 1]);
      seedRanges.push({ start: seedNumber, range: range });
    }
  });
  return seedRanges;
}

function* generateSeeds(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function getMappingValue(mapValue: number, soilMap: string[]): number {
  let value = mapValue;
  soilMap.forEach(map => {
    const ranges = map.split(' ');
    const destRange = parseInt(ranges[0]);
    const sourceRange = parseInt(ranges[1]);
    const rangeLength = parseInt(ranges[2]);

    if (mapValue >= sourceRange && mapValue <= sourceRange + rangeLength && mapValue === value) {
      value = destRange + (mapValue - sourceRange);
    }
  });
  return value;
}

const parseMapping = (mapString: string): string[] => mapString.split(':|')[1].split('|');

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
