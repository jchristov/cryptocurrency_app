import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {observer, inject} from 'mobx-react';
import { timeFormat } from 'd3-time-format';
import Back from '../../common/Back';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import ChartList from '../../chart/ChartList';
import ChartPrice from '../../chart/ChartPrice';
import HorizontalChartAxis from '../../chart/HorizontalChartAxis';
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
      title: navigation.state.params.item.extra_info.FullName || 'Детали',
      headerTitle: <Header value={navigation.state.params.item.extra_info.FullName}/>,
      headerStyle: { 
          backgroundColor: Colors.palatinateBlue
      },
      headerLeft: <Back onBackPress={_goBack} value="Назад" />,
      headerRight: <DetailIcons cryptocurrency={navigation.state.params.item}/>
    }
  };

  componentDidMount(){
    this.fetchPriceData();
  }

  fetchPriceData = async() => {
    const { charts, navigation } = this.props;
    const limit = DURATION_LIST[charts.selectedDurationIndex].limit;
    const api = DURATION_LIST[charts.selectedDurationIndex].api;

    await charts.loadCharts('BTC', DEFAULT_CURRENCY, api, limit);   
  }

  handleDurationChange = (index) => { 
    this.props.charts.setDurationIndex(index);
    //FIX 
    this.fetchPriceData();
  }

  renderDurationTabs = () => {
    const duration_list = DURATION_LIST.map((itm, index) => {
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
        {duration_list}
      </Tabs> 
      );
  }


  /**
   * FIX
   */
  renderCurrencyPrice() {
    const { charts, navigation } = this.props; 
    const oldPrice = charts.entities[0].price;
    const currentPrice = navigation.state.params.item.PRICE; 
    return(
        <ChartPrice
          cryptocurrencyLabel={'bitcoin'}
          durationLabel={DURATION_LIST[charts.selectedDurationIndex].humanize}
          currentPrice={+currentPrice}
          oldPrice={+oldPrice}
        />
    );
  }
  
  render() {
    const { charts, navigation } = this.props;
    const format = timeFormat('%B %d, %Y');
    let tickCount = 7;
    const { height, width } = Dimensions.get('window');
    const durationType = DURATION_LIST[charts.selectedDurationIndex];
    const data = navigation.state.params.item;    

    if(durationType == DURATION.ALL || durationType == DURATION.YEAR){
      tickCount = 4;
    }

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
          <HorizontalChartAxis data={charts.entities} tickCount={tickCount} duration={durationType}/>
          <DetailSections cryptocurrency={data.FROMSYMBOL} lastEntities={lastEntities}/>
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