import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
import Sections from '../../common/Sections';
import DetailSections from '../../detail/DetailSections';
import DetailIcons from '../../detail/DetailIcons';
import ConfirmModal from '../../common/ConfirmModal';
import Loader from '../../common/Loader';
import modal from '../../../decorators/modal';
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
    };
  
    return {  
      title: navigation.state.params.cryptocurrency.name || 'Детали',
      headerTitle: <Header styleText={styles.title} value={navigation.state.params.cryptocurrency.name}/>,
      headerStyle: { 
          backgroundColor: Colors.palatinateBlue,
          borderBottomWidth: 1,
      },
      headerLeft: <Back onBackPress={_goBack} value="Назад" />,
      headerRight: <DetailIcons cryptocurrency={navigation.state.params.cryptocurrency}/>
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
      return <Text style={style} key={itm.codename}>{itm.codename}</Text>
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
   * FIX
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

    if(!charts.loaded) return <Loader/>
    const lastEntities = charts.entities[charts.entities.length - 1];
    return (
      <ScrollView style={styles.body}>
        <View style={styles.contanier}>
          <View style={styles.section}>
            { this.renderDurationTabs() }
            { this.renderCurrencyPrice() }
          </View>
          <View style={styles.charts}>
            <ChartList 
              data={charts} 
              height={height/2} 
              width={width}
            />
          </View>
          <HorizontalChartAxis data={charts.entities} duration={durationType}/>
          <DetailSections cryptocurrency={cryptocurrency} lastEntities={lastEntities}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: Colors.white,
    flex: 1
  },
  contanier:{
    flexDirection: 'column',
    flex: 1
  },
  charts:{
    flexDirection: 'row',
    margin: 0,
    padding: 0,
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