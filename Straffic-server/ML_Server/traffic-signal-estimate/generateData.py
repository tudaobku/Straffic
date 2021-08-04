import pandas as pd 
import random
import time
import os

NUMBER_GENERATE = 10000
TRAFFIC_DENSITY = 'traffic_density'
TIME_NEED = 'time_need'

def generateData():
    # Random from 0 to 45 for traffic density
    traffic_density = random.random() * 45
    if traffic_density < 1: return 0, 0

    # 3 seconds for the delay vehicles start running
    time_need = traffic_density * 1.5 + 3

    return traffic_density, time_need
    

if __name__ == "__main__":
    dataGenerate = {
        TRAFFIC_DENSITY: [],
        TIME_NEED: []
    }

    for i in range(NUMBER_GENERATE):
        traffic_density, time_need = generateData()
        dataGenerate[TRAFFIC_DENSITY].append(traffic_density)
        dataGenerate[TIME_NEED].append(time_need)

    df = pd.DataFrame(dataGenerate)
    df.to_csv(os.path.join(os.path.dirname(__file__), 'data.csv'), index = False)