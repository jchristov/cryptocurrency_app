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
import Tabs from '../../tabs/Tabs';
import { DURATION, DEFAULT_CURRENCY } from '../../../constants';

const DURATION_LIST = Object.keys(DURATION).map(item => DURATION[item]); 

@inject('charts')
@observer
class DetailScreen extends Component {
    
  static propTypes = {
  };

  //Colors.palatinateBlue

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
    const {charts} = this.props; 

    charts.setDurationIndex(index);
    this.fetchPriceData();
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
    const { charts } = this.props;
    const format = timeFormat('%B %d, %Y');
    const { height, width } = Dimensions.get('window');

    console.log(charts.entities.length);
    

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
  text:{
    color: Colors.actionText,
    fontSize: 16,
  }
});

export default DetailScreen;