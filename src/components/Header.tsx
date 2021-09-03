import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon style={styles.icon} name="menu-outline" />
      </TouchableOpacity>
      <Text style={styles.text}>WEATHER</Text>
      <View style={{width: 20}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 0.1,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    fontSize: 20,
  },
});
export default Header;
