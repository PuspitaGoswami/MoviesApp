import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from './Card';

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.listView}>
        <View style={{paddingLeft: 10}}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default List;
