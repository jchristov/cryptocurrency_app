import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import images from '../helpers/images';
import Integer from '../common/Integer';
import { numberFormat } from '../helpers/utils';
import Colors from '../common/Colors';

class CoinCard extends PureComponent {
  static propTypes = {
  };

  render() {
    const {coin: {
      id, 
      seperator, 
      symbol, 
      name, 
      price_usd, 
      percent_change_24h, 
      percent_change_7d
      }
    } = this.props;
    
    return (                         
      <View style={styles.container}>
        <View style={[styles.cell, styles.head ]}>
          <Image style={styles.image} source={{uri: images.currencies.medium_img(id)}}/>
          <Text 
            ellipsizeMode='tail' 
            numberOfLines={1} 
            style={[styles.textName, styles.textLeft]}
          >
            {name}
          </Text>
        </View>
        <Integer
          style={[styles.textName, styles.cell, styles.textRight]}
          suffix = '%'
          type="highlight"
          value={percent_change_24h}
        />
        <Integer
          style={[styles.textName, styles.cell, styles.textRight]}
          suffix = '%'
          type="highlight"
          value={percent_change_7d}
        />
        <Text style={[styles.textName, styles.cell ,styles.textRight]} numberOfLines={1}>
            {'$' + numberFormat(Number(price_usd).toFixed(2))}
        </Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: Colors.lightBackground,
      justifyContent: 'space-between',
  },
  image: {
      width: 24,
      height: 24,
      marginLeft: 10,
      marginRight: 10,
  },
  cell: {
      flex: 1 ,
      paddingHorizontal: 2 ,
      paddingVertical: 10  
  },
  head: {
      alignItems: 'center',
      flex: 2,
      flexDirection: 'row' 
  },
  textName: {
      color: Colors.darkText,
      fontSize: 14,
      flex: 1,
      fontWeight: 'bold'
  }, 
  textLeft: {
      textAlign: 'left',
  },
  textRight: {
      textAlign: 'right',
  },
  textCenter: {
      textAlign: 'center',
  },
  icon: {
      marginRight: 10,
      marginLeft: 10
  }
});


export default CoinCard;