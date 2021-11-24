import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const propTypes = PropTypes.bool;

const defaultProps = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;

    return (
      <View>
        {main ? (
          <View style={styles.mainNAv}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  mainNAv: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

export default Navbar;
