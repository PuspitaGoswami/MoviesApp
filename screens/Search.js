import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/Services';
import Card from '../components/Card';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const onSubmit = query => {
    searchMovieTv(query, 'movie').then(data => {
      setSearchResult(data);
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Movie or TV shows"
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit(text)}>
          <Icon name={'search-outline'} size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        {searchResult && searchResult.length > 0 && (
          <FlatList
            data={searchResult}
            numColumns={3}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        )}
        {searchResult && searchResult.length == 0 && (
          <View style={{paddingLeft: 20}}>
            <Text>No Result</Text>
          </View>
        )}
        {!searchResult && (
          <View style={{paddingLeft: 20}}>
            <Text>Type somthing to start searching</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 50,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchContainer: {},
});

export default Search;
