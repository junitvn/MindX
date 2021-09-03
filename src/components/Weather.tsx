import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Weather = (props: any) => {
  const {city, country, current} = props.data;
  const {weather, pollution} = current;
  const {ts, tp, pr, hu, ws, wd, ic} = weather;
  const {aqius, mainus, aqicn, maincn} = pollution;
  return (
    <View>
      <Text style={styles.text}>{`${city} - ${country}`}</Text>
      <Text>{`Temperature (celsius): ${tp}`}</Text>
      <Text>{`Atmospheric Pressure (hPa): ${pr}`}</Text>
      <Text>{`Humidity (%): ${hu}`}</Text>
      <Text>{`Wind speed (m/s): ${ws}`}</Text>
      <Text>{`Temperature (elsius): ${tp}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {fontSize: 20, fontWeight: 'bold', paddingHorizontal: 4},
});

export default Weather;
