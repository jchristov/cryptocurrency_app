import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';
import images from '../helpers/images';
import Integer from '../common/Integer';
import { numberFormat } from '../helpers/utils';

export default class CoinCard extends PureComponent {
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
                <Image style={styles.image} source={{uri: images.currencies.medium_img(id)}}/>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={styles.textName}
                >
                    {name}
                </Text>
                <Integer
                    style={styles.textName}
                    suffix = '%'
                    type="highlight"
                    value={percent_change_24h}
                />
                <Integer
                    style={styles.textName}
                    suffix = '%'
                    type="highlight"
                    value={percent_change_7d}
                />
                <Text 
                    style={styles.textName} 
                    numberOfLines={1}
                >
                    {'$' + numberFormat(Number(price_usd).toFixed(2))}
                </Text>
            </View>
        );   
    }
}

const styles = StyleSheet.create({
    image: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#fad76f',
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 2 ,
		paddingVertical: 10
    },
    textName: {
        color: '#545454',
        fontSize: 14,
        flex: 1,
        fontWeight: 'bold'
    }
});