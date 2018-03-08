import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { extent } from 'd3-array';
import { formatCurrency } from '../../helpers/utils';
import Colors from '../../common/Colors';

const VerticalChartAxis = ({data, textAlign}) => {
  textAlign = textAlign === 'left' ? 'left' : 'right';
  
  const [minPrice, maxPrice] = extent(data, d => d.price);

  return (
    <View style={[styles.container, textAlign === 'left' ? styles.textLeft : styles.textRight]}>
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
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data
  })).isRequired,
  textAlign: PropTypes.oneOf(['left', 'right']).isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 40
  },
  textLeft: {
    alignItems: 'flex-start'
  },
  textRight: {
    alignItems: 'flex-end'
  },
  text: {
    color: Colors.lightText,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default VerticalChartAxis;