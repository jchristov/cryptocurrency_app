import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { formatCurrency } from '../../helpers/utils';
import { DEFAULT_CURRENCY } from '../../../constants';
import Colors from '../../common/Colors';

const PLUS_CHAR = '+';
const MINUS_CHAR = '\u2212';
const ACTIVE_CURRENCY = 'usd';

const Price = ({label, value, isCurrency, isPercentage, showPlusCharacter, visible}) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const currencyValue = formatCurrency(Number(absValue).toFixed(2), ACTIVE_CURRENCY, 1);
  const percentageValue = Number(absValue).toFixed(2);
  


  return (
    visible && 
    <View style={styles.container}>
      <View style={styles.section}>
          {showPlusCharacter && <Text style={[styles.small_font, styles.green]}>{PLUS_CHAR}</Text>}
          {isNegative && <Text style={styles.small_font}>{MINUS_CHAR}</Text>}

          {isCurrency && <Text style={styles.small_font}>{currencyValue.slice(0, 1)}</Text>}
          {isCurrency && <Text style={styles.large}>{currencyValue.slice(1, -2)}</Text>}
          {isCurrency && <Text style={styles.small_font}>{currencyValue.slice(-2)}</Text>}

          {isPercentage && <Text style={styles.large}>{percentageValue}</Text>}
          {isPercentage && <Text style={styles.small_font}>%</Text>}
      </View>
      <View>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
}

Price.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isCurrency: PropTypes.bool,
  isPercentage: PropTypes.bool,
  showPlusCharacter: PropTypes.bool,
  visible: PropTypes.bool
};

Price.defaultProps = {
  isCurrency: false,
  isPercentage: false,
  showPlusCharacter: false,
  visible: true,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'center',  
  },
  label: {
    color: Colors.inactiveText,
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
  small_font: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 4
  },
  large: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'normal',
  },
  green: {
    color: Colors.green
  }

});

export default Price;