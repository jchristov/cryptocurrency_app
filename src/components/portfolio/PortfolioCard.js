import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image} from 'react-native';
import images from '../helpers/images';

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
                  <View>
                    <Text>{coin.PRICE}</Text>
                    <Text>{coin.CHANGEPCT24HOUR}</Text>
                  </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    section:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    }
});