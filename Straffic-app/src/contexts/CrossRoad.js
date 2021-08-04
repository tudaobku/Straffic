import {response} from 'express';
import React, {useEffect, useState} from 'react';
import {baseURL} from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const CrossRoadContext = React.createContext([]);

export const CrossRoadContextProvider = ({children}) => {
  const [crossRoadList, setCrossRoadList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [crossRoad, setCrossRoad] = useState({});
  const getCrossRoadList = async () => {
    try {
      const response = await axios.post(
        baseURL + 'road/crossroad',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await AsyncStorage.getItem('userToken')),
          },
        },
      );
      response.data.forEach(element => {
        element.value = element.id;
        element.label = element.crossRoadName;
        delete element.id;
        delete element.crossRoadName;
      });
      setCrossRoadList(response.data);
      setCrossRoad(response.data[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    getCrossRoadList();
  }, []);

  return (
    <CrossRoadContext.Provider
      value={{crossRoadList, isLoading, error, crossRoad, setCrossRoad}}>
      {children}
    </CrossRoadContext.Provider>
  );
};
