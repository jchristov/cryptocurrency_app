import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import {View, StyleSheet, Text, Image} from 'react-native';

export default class CoinCard extends Component {
    static propTypes = {

    };

    render() {
        const {coin:{id, seperator, symbol, coin_name, price_usd, percent_change_24h, percent_change_7d}} = this.props;
        console.log('---', this.props.coin);
        
        return (
            <Card style={styles.container}>
                <View style={styles.topColumn}>
                    <Image style={styles.image} source={{uri: `https://files.coinmarketcap.com/static/img/coins/16x16/${coin.id}.png`}}/>
                    <Text>{symbol}</Text>
                    <Text>{seperator}|</Text>
                    <Text>{coin_name}</Text>
                    <Text style={coinPrice}>{price_usd}
                        <Text style={moneySymbol}> $ </Text>
                    </Text>
                </View>
                <View style={styles.bottomColumn}>
                    <Text>24h:
                        <Text style={percent_change_24h < 0 ? styles.percentChangeMinus : styles.percentChangePlus}>
                            {percent_change_24h} %
                        </Text>
                    </Text>
                    <Text>7d:
                        <Text style={percent_change_7d < 0 ? styles.percentChangeMinus : styles.percentChangePlus}>
                            {percent_change_7d} %
                        </Text>
                    </Text>
                </View>
            </Card>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
    },
    topColumn:{
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    },
    bottomColumn:{
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    image: {

    },
    percentChangeMinus:{
        color: "#00BFA5",
        fontWeight: "bold",
        marginLeft: 5
    },
    percentChangePlus: {
        color: "#DD2C00",
        fontWeight: "bold",
        marginLeft: 5
    }
});