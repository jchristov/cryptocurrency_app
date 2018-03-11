import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight , View, StyleSheet, Text } from 'react-native';
import Colors from '../common/Colors';
import { observer } from 'mobx-react';

const Tabs = observer(({children, keys, selectedIndex, handlePress}) => {
  return (
    <View style={styles.container}>
      {
        children.map((child, index) => {
          const style = {};
          if(index === selectedIndex){
            style.borderBottomColor = Colors.yellow;
            style.borderBottomWidth = 2;  
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
})

Tabs.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,  
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent'
  }
});

export default Tabs;