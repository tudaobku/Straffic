import pandas as pd
import numpy as np
import random 
from joblib import dump, load

from pyod.models.mcd import MCD
# Minimum Covariance Determinant (use the mahalanobis distances as the outlier scores)


data = pd.read_csv('data.csv')
data['flag'] = 0.

X_train = data[['temperature', 'noise', 'gas']].to_numpy()

Y_train = data['flag'].to_numpy()

mcd = MCD() 
mcd.fit(X_train)
dump(mcd, 'mcd_anomaly_delection.joblib')

print(mcd.predict([[10,200,1], [35,600,0]])) # will print [1 0]