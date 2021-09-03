import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {API_KEY, GET_NEAREAST_CITY} from '../utils/config';
import Weather from '../components/Weather';
import {isEmpty} from 'lodash';
import Search from '../components/Search';

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [gettingLocation, setGettingLocation] = useState(true);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location: any) => {
        const {latitude, longitude} = location;
        setCurrentLocation({latitude, longitude});
      })
      .catch((error: any) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    const {latitude, longitude} = currentLocation;
    const api = `${GET_NEAREAST_CITY}lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
    axios
      .get(api)
      .then(response => {
        setGettingLocation(false);
        setWeatherData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [currentLocation]);

  const renderLoading = useMemo(() => {
    return (
      <View>
        <Text>Loading your weather...</Text>
      </View>
    );
  }, [gettingLocation]);

  const renderWeather = useMemo(() => {
    if (isEmpty(weatherData)) return null;
    return <Weather data={weatherData} />;
  }, [weatherData]);

  const onClickLocation = (location: any) => {
    const {city, state, country} = location;
    axios
      .get(
        `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${API_KEY}`,
      )
      .then(response => {
        setWeatherData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.fill}>
      <Header />
      <View style={styles.content}>
        <Search onClickLocation={onClickLocation} />
        {gettingLocation ? renderLoading : renderWeather}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: 8,
  },
});
export default Home;
