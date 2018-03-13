import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { DURATION } from '../../../constants';
import Colors from '../../common/Colors';

const DURATION_LIST = Object.keys(DURATION).map(itm => DURATION[itm]);

class HorizontalChartAxis extends Component {
  static formatDate(timestamp, duration){
    switch (duration) {
      case DURATION.ALL:
        return timeFormat('%b %Y')(timestamp); // 'Mmm YYYY'
      case DURATION.YEAR:
      case DURATION.MONTH:
      case DURATION.WEEK:
        return timeFormat('%b %_d')(timestamp); // 'Mmm D'
      case DURATION.DAY:
      case DURATION.HOUR:
      default:
        return timeFormat('%I:%M %p')(timestamp); // 'HH:MM PM/AM'
    }
  }

  static generateTimeAxisTicks(data, tickCount){
    if(data.length < 2){
      return [];
    }
    const [minTime, maxTime] = extent(data, d => d.time);
    const rangeStep = (maxTime - minTime) / (tickCount - 1);
    const generatedTicks = [];
    for(let i=0; i< tickCount; i++){
      const time = new Date(minTime).valueOf();
      generatedTicks.push(time + (i * rangeStep));
    }
    return generatedTicks;
  }

  renderTimeAxisTick = (timestamp, duration) => {
    return(
      <View key={timestamp}>
        <Text style={styles.timestamp}>{HorizontalChartAxis.formatDate(timestamp, duration)}</Text>
      </View>
    );
  }

  render() {
    const {data, duration, tickCount} = this.props;
    const axisTicks = HorizontalChartAxis.generateTimeAxisTicks(data, tickCount);
    
    return (
      <View style={styles.container}>
        {axisTicks && axisTicks.map(time => this.renderTimeAxisTick(time, duration))}    
      </View>
    );
  }
}

HorizontalChartAxis.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data
  })).isRequired,
  duration: PropTypes.oneOf(DURATION_LIST),
  tickCount: PropTypes.number,
};

HorizontalChartAxis.defaultProps = {
  tickCount: 5
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 8,
    paddingTop: 8
  },
  timestamp: {
    fontSize: 10,
    fontWeight: '300',
    color: Colors.lightText 
  }
});

export default HorizontalChartAxis;