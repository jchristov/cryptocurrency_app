import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import {observer, inject} from 'mobx-react';
import { timeFormat } from 'd3-time-format';
import ChartList from '../../chart/ChartList';
import ChartPrice from '../../chart/ChartPrice';
import Colors from '../../common/Colors';
import Tabs from '../../tabs/Tabs';
import { DURATION, DEFAULT_CURRENCY } from '../../../constants';

const DURATION_LIST = Object.keys(DURATION).map(item => DURATION[item]); 

@inject('charts')
@observer
class ChartScreen extends Component {
    
  static propTypes = {
  };

  componentDidMount(){
    this.fetchPriceData();
  }

  fetchPriceData = async() => {
    const { charts } = this.props;
    const limit = DURATION_LIST[charts.selectedDurationIndex].limit;
    const api = DURATION_LIST[charts.selectedDurationIndex].api;
    
    await charts.loadPriceHistorical('BTC', DEFAULT_CURRENCY);     
    await charts.loadCharts('BTC', DEFAULT_CURRENCY, api, limit);
  }

  getLoader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size='large'/>
        </View>
    );
  }

  handleDurationChange = (newIndex) => {
    this.props.charts.setDurationIndex(index);
  }

  renderDurationTabs = () => {
    const body = DURATION_LIST.map(itm=> (
        <Text style={styles.text} key={itm.codename}>{itm.codename}</Text>
    ));
    return (
      <Tabs
        keys={DURATION_LIST.map(({ codename }) => codename)}
        handlePress={this.handleDurationChange}
        selectedIndex={this.props.charts.selectedDurationIndex}
      > 
        {body}
      </Tabs> 
      );
  }

  renderCurrencyPrice() {
    const { charts } = this.props; 
    
    return(
      <View style={styles.price}>
        <ChartPrice
          cryptocurrencyLabel={'bitcoin'}
          durationLabel={DURATION_LIST[charts.selectedDurationIndex].humanize}
          pricesHistory={charts.entities}
          historicalPrice={charts.historicalPrice}
        />
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
            <View style={styles.section}>
              { this.renderDurationTabs() }
              { this.renderCurrencyPrice() }
            </View>
            <View style={styles.charts}>
                <ChartList 
                  data={charts.entities} 
                  height={height / 3} 
                  width={width}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  contanier:{
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  charts: {
    flexDirection: 'row',
    marginTop: 20  
  },
  section: {
    backgroundColor: Colors.palatinateBlue,
    flexDirection: 'column'
  },
  price: {
    flexDirection: 'column',
    height: 90,
    justifyContent: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    fontWeight: '300'
  },
  text:{
    color: Colors.white,
    fontSize: 16,
  }
});

export default ChartScreen;