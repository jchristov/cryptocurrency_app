import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import Price from './Price';
import Colors from '../common/Colors';
import { DEFAULT_CURRENCY } from '../../constants';

const ChartPrice = ({cryptocurrencyLabel, durationLabel, currentPrice, oldPrice}) => {
  const priceDifference = currentPrice - oldPrice;
  const percentageDifference = ((currentPrice / oldPrice) - 1) * 100 || 0;

  return (
    <View style={styles.container}>
      <Price
        label={`${cryptocurrencyLabel} цена`}
        isCurrency={true}  
        value={currentPrice}
      />
      <Price
        showPlusCharacter={priceDifference > 0}
        isCurrency={true}
        label={`${durationLabel} (${DEFAULT_CURRENCY})`}
        value={priceDifference}
        visible={!!durationLabel}
      />
      <Price
        showPlusCharacter={percentageDifference > 0}
        isPercentage={true}
        label={`${durationLabel} (%)`}
        value={percentageDifference}
        visible={!!durationLabel}
      />
    </View>
  );
}

ChartPrice.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
  }
});

export default ChartPrice;