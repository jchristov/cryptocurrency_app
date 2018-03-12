import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { DURATION } from '../../../constants';

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

  render() {
    return (
      <View>
        
      </View>
    );
  }
}

HorizontalChartAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data
  })).isRequired,
  duration: PropTypes.oneOf(DURATION_LIST),
  tickCount: PropTypes.number,
};

HorizontalChartAxis.defaultProps = {
  tickCount: 7
};

export default HorizontalChartAxis;