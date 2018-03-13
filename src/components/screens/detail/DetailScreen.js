import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import {observer, inject} from 'mobx-react';
import { timeFormat } from 'd3-time-format';
import Back from '../../common/Back';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import images from '../../helpers/images';
import ChartList from '../../chart/components/ChartList';
import ChartPrice from '../../chart/components/ChartPrice';
import HorizontalChartAxis from '../../chart/components/HorizontalChartAxis';
import Tabs from '../../tabs/Tabs';
import Sections from '../../sections/Sections';
import { DURATION, DEFAULT_CURRENCY } from '../../../constants';

const DURATION_LIST = Object.keys(DURATION).map(item => DURATION[item]); 

@inject('charts')
@observer
class DetailScreen extends Component {
    
  static propTypes = {
  };

  static navigationOptions = ({navigation, screenProps}) => {
    _goBack = () => {
      navigation.goBack();
    }
    
    return {  
      title: navigation.state.params.cryptocurrency.name || 'Детали',
      headerTitle: <Header styleText={styles.title} value={navigation.state.params.cryptocurrency.name}/>,
      headerStyle: { 
          backgroundColor: Colors.palatinateBlue,
          borderBottomWidth: 1,
      },
      headerLeft: <Back onBackPress={_goBack}  value="Назад" />
    }
  };

  componentDidMount(){
    this.fetchPriceData();
  }

  fetchPriceData = async() => {
    const { charts, navigation } = this.props;
    
    const cryptocurrency = navigation.state.params.cryptocurrency;
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

  handleDurationChange = (index) => { 
    this.props.charts.setDurationIndex(index);
    //FIX 
    this.fetchPriceData();
  }

  renderDurationTabs = () => {
    const body = DURATION_LIST.map((itm, index) => {
      let style = styles.textInActive;
      if(index === this.props.charts.selectedDurationIndex){
        style = styles.textActive;
      }
      return (
        <Text style={style} key={itm.codename}>
          {itm.codename}
        </Text>
      );
    });

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


  /**
   * 
   */
  renderCurrencyPrice() {
    const { charts, navigation } = this.props; 
    const cryptocurrency = navigation.state.params.cryptocurrency;


    const oldPrice = charts.historicalPrice[0].USD;
    

    return(
        <ChartPrice
          cryptocurrencyLabel={'bitcoin'}
          durationLabel={DURATION_LIST[charts.selectedDurationIndex].humanize}
          currentPrice={+cryptocurrency.price_usd}
          oldPrice={+oldPrice}
        />
    );
  }

  
  render() {
    const { charts, navigation } = this.props;
    const format = timeFormat('%B %d, %Y');
    const { height, width } = Dimensions.get('window');
    const durationType = DURATION_LIST[charts.selectedDurationIndex];
    const cryptocurrency = navigation.state.params.cryptocurrency;

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
        <HorizontalChartAxis data={charts.entities} duration={durationType}/>
        <Sections
          title= 'Market'
          data = {[
            {
              title: 'Coinmarketcap Rank',
              value: cryptocurrency['rank']
            },
            {
              prefix: '$',
              title: 'Капитализация Рынка',
              value: cryptocurrency['market_cap_usd']
            },
            {
              prefix: '$',
              title: 'Объем (24 часа)',
              value: cryptocurrency['24h_volume_usd']
            },
            {
              title: 'Предложение',
              value: cryptocurrency['total_supply']
            },
            {
              title: 'Max Предложение',
              value: cryptocurrency['max_supply']
            }
          ]} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contanier:{
    flexDirection: 'column',
    backgroundColor: Colors.white,
    flex: 1
  },
  charts:{
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border  
  },
  section:{
    backgroundColor: Colors.white,
    flexDirection: 'column'
  },
  loader:{
    flex: 1,
    justifyContent: 'center'
  },
  title:{
    fontWeight: '300'
  },
  textInActive:{
    color: Colors.inactiveText,
    fontSize: 16,
    textAlign: 'center'
  },
  textActive: {
    color: Colors.actionText,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default DetailScreen;