import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import images from '../helpers/images';
import Colors from '../common/Colors';
import { numberFormat, getCurrencyChart } from '../helpers/utils';
import Integer from '../common/Integer';

const {width, height} = Dimensions.get('window');

class PortfolioCard extends PureComponent {
  static propTypes = {

  };

  render() {
    const {coin} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.coin}>
            <Image style={styles.coinImg} source={{uri:getCurrencyChart(coin.FROMSYMBOL)}} />
            <Text style={[styles.text, styles.textHeader]}>
              {coin.FROMSYMBOL}
            </Text>
          </View>
          <View style={styles.chart}>
            <Image style={styles.img} source={{uri:getCurrencyChart(coin.FROMSYMBOL) }}/>
          </View>
        </View>

        <View style={[styles.section, styles.borderTop]}>
          <View>
              <Text style={styles.label}>Purchase price:</Text>
              <Text style={[styles.text, styles.textPrice]}>
                {'$' + numberFormat(Number(coin.PRICE).toFixed(2))}
              </Text>
          </View>
          <View>
              <Text style={styles.label}>Today price:</Text>
              <Text style={[styles.text, styles.textPrice]} numberOfLines={1}>
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
    padding: 20,
    justifyContent: 'space-between',
  },
  label:{
    fontSize: 14,
    color: Colors.inactiveText,
    fontWeight: '100'
  },
  text: {
    color: Colors.darkText,
    fontSize: 18,
    flex: 1,
    fontWeight: '300'
  }, 
  textHeader: {
    fontWeight: '600',
    color: Colors.facebookBlue
  },
  textPrice: {
    color: Colors.facebookBlue
  },
  textPct: {
    color: Colors.yellow
  },
  chart: {
  },
  coin: {
   
  },
  coinImg: {
    width: 32,
    height: 32
  },
  img: {
    width: 150,
    height: 35,
    minWidth: 150,
    maxWidth: 150,
  }

});

export default PortfolioCard;