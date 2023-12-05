import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data: string[] = await readData(dataPath);
  let value = 0;

  const dataMaps = data.join('|').split('||');
  const seeds = dataMaps[0].split('seeds: ')[1].split(' ');
  const soilMap = parseMapping(dataMaps[1]);
  const fertilizerMap = parseMapping(dataMaps[2]);
  const waterMap = parseMapping(dataMaps[3]);
  const lightMap = parseMapping(dataMaps[4]);
  const temperatureMap = parseMapping(dataMaps[5]);
  const humidityMap = parseMapping(dataMaps[6]);
  const locationMap = parseMapping(dataMaps[7]);

  seeds.forEach((seed, index) => {
    const soilValue = getMappingValue(parseInt(seed), soilMap);
    const fertilizerValue = getMappingValue(soilValue, fertilizerMap);
    const waterValue = getMappingValue(fertilizerValue, waterMap);
    const lightValue = getMappingValue(waterValue, lightMap);
    const tempValue = getMappingValue(lightValue, temperatureMap);
    const humidityValue = getMappingValue(tempValue, humidityMap);
    const locationValue = getMappingValue(humidityValue, locationMap);

    if (!index) {
      value = locationValue;
    } else if (locationValue < value) {
      value = locationValue;
    }
  });

  return value;
}

function getMappingValue(mapValue: number, soilMap: string[]): number {
  let value = mapValue;
  soilMap.forEach(map => {
    const ranges = map.split(' ');
    const destRange = parseInt(ranges[0]);
    const sourceRange = parseInt(ranges[1]);
    const rangeLength = parseInt(ranges[2]);

    if (mapValue > sourceRange && mapValue < sourceRange + rangeLength) {
      value = destRange + (mapValue - sourceRange);
    }
  });
  return value;
}

const parseMapping = (mapString: string): string[] => mapString.split(':|')[1].split('|');

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
