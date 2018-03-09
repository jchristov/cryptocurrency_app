import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { scan } from 'd3-array';
import Price from './Price';

const ChartPrice = ({cryptocurrencyLabel, pricesHistory, historicalPrice, durationLabel}) => {
  const lastIndex = scan(pricesHistory, (a, b) => a.time - b.time);
  const oldPrice = pricesHistory[lastIndex] && pricesHistory[lastIndex].price;
  console.log('lastIndex', lastIndex, historicalPrice);
  return (
    <View style={styles.container}>
      <Price
        label={`${cryptocurrencyLabel} цена`}
        isCurrency={true}
        value={'123123'}
      />
    </View>
  );

}

ChartPrice.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default ChartPrice;