import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight , View, StyleSheet, Text } from 'react-native';
import Colors from '../common/Colors';

const Tabs = ({children, keys, selectedIndex, handlePress}) => {
  return (
    <View style={styles.container}>
      {
        children.map((child, index) => {
          const style = {};
          if(index === selectedIndex){
            style.borderBottomColor = Colors.border;
            style.borderBottomWidth = 1;  
          }
          return (
            <TouchableHighlight 
              style={[styles.button, style]}
              key={keys[index]} 
              onPress={handlePress.bind(null, index)}
            >     
              {child}
            </TouchableHighlight>
          );          
        })
      }
    </View>
  );
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePress: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'transparent'
  }
});

export default Tabs;