import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePressed} = this.props;
    return (
      <TouchableOpacity onPress={() => handlePressed()} style={styles.button}>
        <Icon name="caret-forward-outline" size={30} color="white" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4481FC',
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 10,
  },
});

export default PlayButton;
