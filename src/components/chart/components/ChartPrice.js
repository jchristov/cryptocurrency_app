import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { scan } from 'd3-array';
import Price from './Price';
import { DEFAULT_CURRENCY } from '../../../constants';
import Colors from '../../common/Colors';

const ChartPrice = ({cryptocurrencyLabel, historicalPrice, durationLabel, pricesHistory,}) => {
  const lastIndex = scan(pricesHistory, (a, b) => a.time - b.time);
  const oldPrice = pricesHistory[lastIndex] && pricesHistory[lastIndex].price;

  console.log('---', oldPrice, historicalPrice);
  

  return (
    <View style={styles.container}>
      <Price
        isCurrency={true}  
        label={`${cryptocurrencyLabel} price`}
        value={123123}
      />
      <Price
        showPlusCharacter={true}
        isCurrency={true}
        label={`${durationLabel} (${DEFAULT_CURRENCY})`}
        value={123123}
      />
      <Price
        showPlusCharacter={true}
        isCurrency={true}
        label={`${durationLabel} (%)`}
        value={123123}
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
    borderTopWidth: 1,
    height: 90,
    borderTopColor: Colors.yellow,
    marginLeft: 10,
    marginRight: 10
  }
});

export default ChartPrice;