import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Card } from 'react-native-elements';

export default class CoinCard extends PureComponent {
    static propTypes = {

    };

    render() {
        const {coin: {id, seperator, symbol, name, price_usd, percent_change_24h, percent_change_7d}} = this.props;
        
        return (
            <Card style={styles.container}>
                <View style={styles.topColumn}>
                    <Image style={styles.image} source={{uri: `https://files.coinmarketcap.com/static/img/coins_legacy/32x32/${id}.png`}}/>
                    <Text style={styles.coinSymbol}>{symbol}</Text>
                    <Text style={styles.seperator}>{seperator}|</Text>
                    <Text style={styles.coinName}>{name}</Text>
                    <Text style={styles.coinPrice}>{price_usd}
                        <Text style={styles.moneySymbol}> $ </Text>
                    </Text>
                </View>
                <View style={styles.bottomColumn}>
                    <Text>24h:
                        <Text style={percent_change_24h < 0 ? styles.percentChangeMinus : styles.percentChangePlus}>
                            &nbsp;{percent_change_24h} %
                        </Text>
                    </Text>
                    <Text>7d:
                        <Text style={percent_change_7d < 0 ? styles.percentChangeMinus : styles.percentChangePlus}>
                            &nbsp;{percent_change_7d} %
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
        padding: 40,
        marginBottom: 20,
        borderBottomWidth: 0
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
        width: 32,
        height: 32
    },
    percentChangeMinus:{
        color: "#DD2C00",
        fontWeight: "bold",
        marginLeft: 5
    },
    percentChangePlus: {
        color: "#009700",
        fontWeight: "bold",
        marginLeft: 5
    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",        
    },
    seperator: {
        marginTop: 10,
    }, 
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
    },
    coinPrice: {
        color: '#afafff',
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",        
    },
    moneySymbol: {
        fontWeight: "bold",
    },
});