import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, 
  StyleSheet, 
  Text, 
  Image, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Animated,
  Platform
} from 'react-native';
import Colors from '../common/Colors';
import { numberFormat, getCurrencyChart, getImgUri } from '../../helpers/utils';
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
            <Image style={styles.coinImg} source={{uri: getImgUri(coin.extra_info.ImageUrl) }}/>
            <Text style={[styles.text, styles.textHeader]}>{coin.extra_info.CoinName} ({coin.FROMSYMBOL})</Text>
          </View>
          <View style={styles.chart}>
            <Image style={styles.img} source={{uri: getCurrencyChart(coin.FROMSYMBOL)}}/>
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
    margin: 15,
    backgroundColor: Colors.white  ,
    borderColor: Colors.border,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,44,92,0.28)',
        shadowOffset: { height: 0, width: 0 },

        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1
      }
    })
  },
  section:{
    flexDirection: "row",
    padding: 15,
    justifyContent: 'space-between',
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor:  Colors.border,
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
    flex: 1,
    flexDirection: 'row'
  },
  coinImg: {
    width: 25,
    height: 25,
    marginRight: 10
  },
  img: {
    width: 125,
    height: 45,
    minWidth: 125,
    maxWidth: 125,
  }

});

export default PortfolioCard;