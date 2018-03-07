import React from 'react';
import './src/fbSetup';
import {addNavigationHelpers} from 'react-navigation';
import AppNavigator from './src/AppNavigator';
import {Provider, observer} from 'mobx-react';
import stores from './src/stores';
import { Font } from 'expo';

@observer
export default class App extends React.Component {
  
  async componentDidMount(){
    await Font.loadAsync({
      'roboto': require('./assets/Roboto-Regular.ttf'),
    });
  }
  
  render() {
    return (
      <Provider {...stores}>
          <AppNavigator navigation = {addNavigationHelpers(stores.navigation.config)}/>
      </Provider>
    );
  }
} 