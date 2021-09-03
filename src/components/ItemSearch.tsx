import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';

const ItemSearch = (props: any) => {
  const {item, index, onItemClick} = props;
  let textContent = '';
  if (item.country) textContent = item.country;
  if (item.state) textContent = item.state;
  if (item.city) textContent = item.city;

  return (
    <TouchableOpacity
      onPress={() => onItemClick(item)}
      style={[styles.itemContainer, {borderTopWidth: index === 0 ? 0 : 1}]}>
      <Text>{textContent}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
    borderTopColor: 'gray',
  },
});

export default ItemSearch;
