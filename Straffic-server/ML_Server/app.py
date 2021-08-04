import django_heroku
from flask import Flask, request
from flask_cors import CORS
from joblib import load
import numpy
import sys
app = Flask(__name__)
CORS(app)
anomaly_detection_model = load('./anomaly-detection/mcd_anomaly_delection.joblib')
traffic_density_model = load('./traffic-density-estimate/traffic_density_model.joblib')
traffic_signal_model = load('./traffic-signal-estimate/traffic_signal_model.joblib')

@app.route("/")
def main():
    return "ML api server"


@app.route('/predict/traffic_density', methods = ['POST'])
def predect_traffic_density(): 
    data = request.json['data']
    listData = list(map(
        lambda value: [value['temperature'], value['noise'], value['gas']],
        data)
    )

    result = traffic_density_model.predict(listData)
    result = list(map(lambda value: value if value > 0 else 0, result))
    
    respone = {'response': result}
    return respone

@app.route('/predict/anomaly_detection', methods = ['POST'])
def predict_anomaly_detection():
    data = request.json['data']
    predict = list(map(
        lambda value: [value['temperature'], value['noise'], value['gas']],
        data
        )
    )
    result = anomaly_detection_model.predict(predict)

    response = {'response': result.tolist()}
    return response


@app.route('/predict/traffic_light_time', methods = ['POST'])
def predict_traffic_light_time():
    MIN_CYCLE = 30
    MAX_CYCLE = 120
    
    data = request.json['data']
    
    if sum(data) == 0 : 
        # No vehicle
        trafficLightTime = list(map(
            lambda value: {
                'red': 15,
                'yellow': 3,
                'green': 12
            },
            data
            )
        )
        respone = {'response': trafficLightTime}
        return respone
    
    data_predict = list(map(lambda value: [value], data))
    prediction = traffic_signal_model.predict(data_predict)
    prediction = list(map(lambda v: round(max(v, 3)), prediction))

    cycleTime = sum(prediction)
    if (cycleTime < MIN_CYCLE):
        prediction = list(map(lambda v: round(v * MIN_CYCLE / cycleTime), prediction))
        cycleTime = sum(prediction)

    if (cycleTime > MAX_CYCLE):
        prediction = list(map(lambda v: round(v * MAX_CYCLE / cycleTime), prediction))
        cycleTime = sum(prediction)

    trafficLightTime = list(map(
        lambda value: {
            'red': cycleTime - value,
            'yellow': 3,
            'green': value - 3
        },
        prediction
        )
    )
    respone = {'response': trafficLightTime}
    return respone


    

if __name__ == "__main__":
    app.run(debug = True)