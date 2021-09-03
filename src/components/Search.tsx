import axios from 'axios';
import React, {useContext, useMemo, useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from '../utils/config';
import ItemSearch from './ItemSearch';
import {cloneDeep} from 'lodash';

const Search = (props: any) => {
  const {onClickLocation} = props;
  const [query, setQuery] = useState('');
  const [hasValue, setHasValue] = useState(false);
  const [result, setResult] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [currentState, setCurrentState] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const allCountries = await axios.get(
      `http://api.airvisual.com/v2/countries?key=${API_KEY}`,
    );
    setData(allCountries.data.data);
    setResult(allCountries.data.data);
  };

  useEffect(() => {
    if (query.length > 0) {
      setHasValue(true);
      if (query.length > 1) search();
      else setResult(data);
    } else {
      setResult([]);
      setHasValue(false);
    }
  }, [query]);

  const search = () => {
    const tempData = cloneDeep(result);
    const listFiltered = tempData.filter((item: any) => {
      if (item.country && item.country.includes(query)) return item;
      if (item.state && item.state.includes(query)) return item;
      if (item.city && item.city.includes(query)) return item;
    });
    setResult(listFiltered);
  };

  const clear = () => {
    setQuery('');
    setResult(data);
    setShowDropDown(false);
  };

  const onItemClick = async (item: any) => {
    if (item.country) {
      const allSates = await axios.get(
        `http://api.airvisual.com/v2/states?country=${item.country}&key=${API_KEY}`,
      );
      setResult(allSates.data.data);
      setCurrentCountry(item);
    } else if (item.state) {
      const allCities = await axios.get(
        `http://api.airvisual.com/v2/cities?state=${item.state}&country=${currentCountry.country}&key=${API_KEY}`,
      );
      setResult(allCities.data.data);

      setCurrentState(item);
    } else {
      onClickLocation({
        city: item.city,
        state: currentState.state,
        country: currentCountry.country,
      });
      setShowDropDown(false);
      setQuery('');
    }
  };

  const show = () => {
    setShowDropDown(true);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        value={query}
        onChangeText={(value: string) => setQuery(value)}
      />
      <TouchableOpacity
        style={styles.buttonSearch}
        onPress={showDropDown ? clear : show}>
        {hasValue ? (
          <Icon style={styles.searchIcon} name="close-outline" />
        ) : (
          <Icon style={styles.searchIcon} name="chevron-down-outline" />
        )}
      </TouchableOpacity>
      {showDropDown && result.length !== 0 && (
        <FlatList
          style={styles.flatList}
          data={result}
          ListEmptyComponent={
            <View style={styles.listEmpty}>
              <Text>Không có kết quả!</Text>
            </View>
          }
          renderItem={({item, index}) => (
            <ItemSearch item={item} index={index} onItemClick={onItemClick} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 8,
  },
  listEmpty: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '99%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    fontSize: 25,
    color: 'black',
  },
  buttonSearch: {
    position: 'absolute',
    top: 10,
    right: '3%',
  },
  flatList: {
    height: 500,
    width: '99%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
export default Search;
