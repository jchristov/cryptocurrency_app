import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { formatCurrency } from '../../helpers/utils';
import { DEFAULT_CURRENCY } from '../../../constants';

const PLUS_CHAR = '+';
const MINUS_CHAR = '\u2212';

const Price = ({label, value, isCurrency, isPercentage, showPlusCharacter, visible = true}) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const currencyValue = formatCurrency(absValue, DEFAULT_CURRENCY);
  const percentageValue = Number(absValue).toFixed(2);
  
  return (
    visible && 
    <View>
      <View>
        {showPlusCharacter && <Text>{PLUS_CHAR}</Text>}
        {isNegative && <Text>{MINUS_CHAR}</Text>}
        {isCurrency && <Text>{currencyValue.slice(0, 1)}</Text>}
        {isCurrency && <Text>{currencyValue.slice(1, -3)}</Text>}
        {isCurrency && <Text>{currencyValue.slice(-3)}</Text>}
        {isPercentage && <Text>{percentageValue}</Text>}
        {isPercentage && <Text>%</Text>}
      </View>
      <View>
        <Text>{label}</Text>
      </View>
    </View>
  );
}


Price.propTypes = {

};

const styles = StyleSheet.create({

});

export default Price;