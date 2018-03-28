import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import images from '../helpers/images';
import Colors from '../common/Colors';
import { numberFormat } from '../helpers/utils';
import Integer from '../common/Integer';

const {width, height} = Dimensions.get('window');

export default class PortfolioCard extends PureComponent {
  static propTypes = {

  };

  render() {
      const {coin} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View>
            <Text>{coin.FROMSYMBOL}</Text>
          </View>
          <View>
            <Text>12</Text>
            <Text>1%</Text>
          </View>
        </View>

        <View style={[styles.section, styles.borderTop]}>
          <View>
              <Text style={styles.label}>Purchase price:</Text>
              <Text style={[styles.textPrice]}>
                {'$' + numberFormat(Number(coin.PRICE).toFixed(2))}
              </Text>
          </View>
          <View>
              <Text style={styles.label}>Today price:</Text>
              <Text style={[styles.textName, styles.textPrice]} numberOfLines={1}>
                {'$' + numberFormat(Number(coin.PRICE).toFixed(2))}
              </Text>
          </View>
          <View>
              <Text style={styles.label}>Profit:</Text>
              <Integer
                style={[styles.text, styles.textPct]}
                suffix = '%'
                type="highlight"
                value="8923"
              />
          </View>  
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
    borderColor: Colors.border,
    borderWidth: 0.5,
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderTopColor:  Colors.border
  },
  section:{
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-between',
  },
  label:{
    fontSize: 16,
    color: Colors.inactiveText,
    fontWeight: '100'
  },
  text: {
    color: Colors.darkText,
    fontSize: 18,
    flex: 1,
    fontWeight: '300'
  }, 
  textPrice: {
    color: Colors.blueCharcoal
  },
  textPct: {
    color: Colors.yellow
  }

});