import React from 'react';
import './src/fbSetup';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './src/AppNavigator';
import {Provider, observer} from 'mobx-react';
import stores from './src/stores';
import { Font } from 'expo';
import { View, StyleSheet } from 'react-native';


@observer
export default class App extends React.Component {
  
  async componentDidMount(){
    await Font.loadAsync({
      'roboto': require('./assets/Roboto-Regular.ttf'),
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Provider {...stores}>
          <AppNavigator navigation = {addNavigationHelpers(stores.navigation.config)}/>
        </Provider>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  }
})
