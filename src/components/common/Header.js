import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Image, View } from 'react-native';
import { getImgUrl } from '../helpers/utils';

export default class Header extends Component {
    static propTypes = {
        value: PropTypes.string
    };

    render() {
        const {value} = this.props;
        const uri = getImgUrl(value);
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: uri}}/>
                <Text style = {styles.text}>
                    {value.toUpperCase()}       
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 21,
        fontWeight: 'bold'
    },
    image: {
        width: 32,
        height: 32
    }
});