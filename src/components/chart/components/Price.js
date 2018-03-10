import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { formatCurrency } from '../../helpers/utils';
import { DEFAULT_CURRENCY } from '../../../constants';
import Colors from '../../common/Colors';

const PLUS_CHAR = '+';
const MINUS_CHAR = '\u2212';

const Price = ({label, value, isCurrency, isPercentage, showPlusCharacter, visible = true}) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const currencyValue = formatCurrency(absValue, DEFAULT_CURRENCY);
  const percentageValue = Number(absValue).toFixed(2);
  
  return (
    visible && 
    <View style={styles.container}>
      <View style={}>
        {showPlusCharacter && <Text style={[styles.small_font, styles.green]}>{PLUS_CHAR}</Text>}
        {isNegative && <Text style={style.small_font}>{MINUS_CHAR}</Text>}
        {isCurrency && <Text >{currencyValue.slice(0, 1)}</Text>}
        {isCurrency && <Text>{currencyValue.slice(1, -3)}</Text>}
        {isCurrency && <Text>{currencyValue.slice(-3)}</Text>}
        {isPercentage && <Text>{percentageValue}</Text>}
        {isPercentage && <Text>%</Text>}
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

Price.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'
  },
  wrap:{

  },
  label: {
    color: '#7d95b6',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  small_font: {
    fontSize: 30,
    fontWeight: 500
  },
  large: {
    fontSize: 48,
    fontWeight: 'normal',
    verticalAlign: 'baseline'
  },
  green: {
    color: Colors.green
  }

});

export default Price;