import pandas as pd
import random
import time

NUMBER_GENERATE = 10000

MIN_TEMPERATURE = 20
MAX_TEMPERATURE = 50

MIN_NOISE = 200
MAX_NOISE = 800

MIN_GAS = 0
MAX_GAS = 1

DEFAULT_AVERAGE_TRAFFIC_DENSITY = 15
RANGE_RANDOM_TRAFFIC_DENSITY = 10

TIME = 'time'
TEMPERATRUE = 'temperature'
NOISE = 'noise'
GAS = 'gas'
TRAFFIC_DENSITY = 'traffic_density'
startTime = time.time()


def generateTemperature():
    return random.randint(MIN_TEMPERATURE, MAX_TEMPERATURE)


def generateNoise():
    return random.randint(MIN_NOISE, MAX_NOISE)


def generateGas():
    return random.randint(MIN_GAS, MAX_GAS)


avg_temperature = (MAX_TEMPERATURE + MIN_TEMPERATURE) / 2
avg_noise = (MAX_NOISE + MIN_NOISE) / 2


def generateData():
    temperature = generateTemperature()
    noise = generateNoise()
    gas = generateGas()

    diff_temperature = temperature - avg_temperature
    diff_noise = noise - avg_noise

    current_avg_traffic_density = \
        DEFAULT_AVERAGE_TRAFFIC_DENSITY + \
        diff_temperature + \
        diff_noise / 37

    if (gas):
        current_avg_traffic_density += 5

    minn = current_avg_traffic_density - RANGE_RANDOM_TRAFFIC_DENSITY / 2
    maxx = current_avg_traffic_density + RANGE_RANDOM_TRAFFIC_DENSITY / 2
    return temperature, noise, gas, max(random.random() * (maxx-minn) + minn, 0)


if __name__ == "__main__":
    dataGenerate = {
        TIME: [],
        TEMPERATRUE: [],
        NOISE: [],
        GAS: [],
        TRAFFIC_DENSITY: []
    }

    for i in range(NUMBER_GENERATE):
        dataGenerate[TIME].append(startTime + i * 5)  # each is 5 seconds
        temperature, noise, gas, traffic_density = generateData()
        dataGenerate[TEMPERATRUE].append(temperature)
        dataGenerate[NOISE].append(noise)
        dataGenerate[GAS].append(gas)
        dataGenerate[TRAFFIC_DENSITY].append(traffic_density)

    df = pd.DataFrame(dataGenerate)
    df.to_csv('./data.csv', index=False)
