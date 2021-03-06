import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Card } from 'react-native-elements';
import images from '../helpers/images';

export default class PortfolioCard extends PureComponent {
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
            <Card style={styles.container}>
                <View style={styles.topColumn}>
                    <Image  
                        style={styles.image} 
                        source={{uri: images.currencies.medium_img(id)}}
                    />
                    <Text style={styles.coinSymbol}>{symbol}</Text>
                    <Text>{seperator}|</Text>
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
        alignItems: 'center',
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
        height: 24, 
        width: 24   
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
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",        
    },
    seperator: {
        marginTop: 10,
    }, 
    coinName: {
        marginLeft: 5,
        marginRight: 20
    },
    coinPrice: {
        color: '#afafff',
        marginLeft: "auto",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",        
    },
    moneySymbol: {
        fontWeight: "bold",
    },
});