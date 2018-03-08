import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { extent } from 'd3-array';
import { formatCurrency } from '../../helpers/utils';
import Colors from '../../common/Colors';

const VerticalChartAxis = ({data, textAlign}) => { 
  const [minPrice, maxPrice] = extent(data, d => d.price);
  const posStyle = {};
  textAlign === 'left' ? posStyle.alignItems = 'flex-start' : posStyle.alignItems = 'flex-end';

  return (
    <View style={[styles.container, posStyle]}>
      <View>
        <Text style={styles.text}>{formatCurrency(maxPrice, 'usd', 0)}</Text>
      </View>
      <View>
        <Text style={styles.text}>{formatCurrency(minPrice, 'usd', 0)}</Text>
      </View>
    </View>
  );

}

VerticalChartAxis.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data,
  })).isRequired,
  textAlign: PropTypes.oneOf(['left', 'right']).isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 65,
  },
  text: {
    color: Colors.lightText,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default VerticalChartAxis;