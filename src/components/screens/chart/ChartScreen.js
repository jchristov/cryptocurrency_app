import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import {observer, inject} from 'mobx-react';
import { timeFormat } from 'd3-time-format';
import ChartList from '../../chart/components/ChartList';
import { DURATION, DEFAULT_CURRENCY } from '../../../constants';
import Colors from '../../common/Colors';
import { Card } from 'react-native-elements';

@inject('charts')
@observer
export default class DetailScreen extends Component {
    
  static propTypes = {
  };

  componentDidMount(){
    const { charts } = this.props;       
    charts.loadCharts('BTC', DEFAULT_CURRENCY);
  }
      
  getLoader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size='large'/>
        </View>
    );
  }

  render() {
    const {charts} = this.props;
    const format = timeFormat('%B %d, %Y');
    const {height, width} = Dimensions.get('window');

    if(!charts.loaded) return this.getLoader();    
          
    return (
        <View style={styles.contanier}>
            <ChartList data={charts.entities} height={225} width={width}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  contanier:{
      flexDirection: 'row',  
  },
  loader: {
      flex: 1,
      justifyContent: 'center'
  },
  title:{
      fontWeight: '300'
  }
});