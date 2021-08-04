import pandas as pd
import matplotlib.pyplot as plt
from joblib import dump, load

from sklearn.linear_model import LinearRegression

traffic = pd.read_csv('data.csv')
y = traffic['traffic_density']
X = traffic[['temperature', 'noise','gas']]

lm = LinearRegression()
lm.fit(X,y)
print('Coefficients: ', lm.coef_)
print('Independent term: ', lm.intercept_)

print('Traffic density from test data: ')
# testData = pd.read_csv('testdata.csv',delimiter=',',header=None)
testData = pd.read_csv('testdata.csv')
print('Test data : ', testData)

print(lm.predict(testData))

name = 'traffic_density_model.joblib'
dump(lm, name)
print('Model save in: ./' + name)

# # To show plot the test sample, uncomment these line
# from sklearn.model_selection import train_test_split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=101)
# predictions = lm.predict(X_test)
# plt.scatter(y_test,predictions)
# plt.xlabel('Y Test')
# plt.ylabel('Predicted Y')
# plt.show()
