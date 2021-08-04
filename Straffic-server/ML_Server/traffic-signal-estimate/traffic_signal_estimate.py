import pandas as pd
import matplotlib.pyplot as plt
from joblib import dump, load
import os 

from sklearn.linear_model import LinearRegression

TRAFFIC_DENSITY = 'traffic_density'
TIME_NEED = 'time_need'

currentPath = os.path.dirname(__file__)
traffic = pd.read_csv(os.path.join(currentPath, 'data.csv'))
y = traffic[TIME_NEED]
X = traffic[[TRAFFIC_DENSITY]]

lm = LinearRegression()
lm.fit(X,y)
print('Coefficients: ', lm.coef_)
print('Independent term: ', lm.intercept_)

# print('Traffic signal from test data: ')
# testData = pd.read_csv('testdata.csv',delimiter=',',header=None)
# testData = pd.read_csv('testdata.csv')
# print('Test data : ', testData)

# print(lm.predict(testData))

name = 'traffic_signal_model.joblib'
path = os.path.join(currentPath, name)
dump(lm, path)
print('Model save in: ./' + path)

# # To show plot the test sample, uncomment these line
# from sklearn.model_selection import train_test_split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=101)
# predictions = lm.predict(X_test)
# plt.scatter(y_test,predictions)
# plt.xlabel('Y Test')
# plt.ylabel('Predicted Y')
# plt.show()
