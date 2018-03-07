import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import {observer, inject} from 'mobx-react';
import Back from '../../common/Back';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import images from '../../helpers/images';
import { timeFormat } from 'd3-time-format';
import ChartList from '../../chart/components/ChartList';
import { DURATION, DEFAULT_CURRENCY } from '../../../constants';

@inject('charts')
@observer
export default class DetailScreen extends Component {
    
  static propTypes = {
  };

  static navigationOptions = ({navigation, screenProps}) => {
    _goBack = () => {
        navigation.goBack();
    }
    return {  
        title: 'Детали',
        headerTitle: <Header style={styles.title} value='Детали'/>,
        headerStyle: { 
            backgroundColor: Colors.palatinateBlue,
            borderBottomWidth: 1,
            color: Colors.white 
        },
        headerLeft: <Back onBackPress={_goBack}  value="Назад" />
    }
  };

  componentDidMount(){
    const { navigation, charts } = this.props;   
    const cryptocurrency = navigation.state.params.uid;

    charts.loadCharts(cryptocurrency, DEFAULT_CURRENCY);
  }
      
  getLoader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size='large'/>
        </View>
    );
  }

  render() {
    const {charts, navigation} = this.props;
    const coinName = navigation.state.params.uid;
    const format = timeFormat('%B %d, %Y');

    if(!charts.loaded) return this.getLoader();    
    console.log('---', charts.entities);
    
    //<Header value={coinName} uri={images.currencies.medium_img(coinName)} />
        
    return (
        <View style={styles.contanier}>
            <ChartList data={charts.entities}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  contanier:{
      flex: 1,
      flexDirection: 'column',
      height: 300,
      backgroundColor: Colors.bianca
  },
  loader: {
      flex: 1,
      justifyContent: 'center'
  },
  title:{
      fontWeight: '300'
  }
});