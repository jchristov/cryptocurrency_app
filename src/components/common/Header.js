import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Image, View } from 'react-native';


export default class Header extends Component {
    static propTypes = {
        value: PropTypes.string
    };

    render() {
        const {value, uri} = this.props;
        return (
            <View style={styles.container}>
                {uri && <Image style={styles.image} source={{uri: uri}}/>} 
                <Text style = {styles.text}>
                    {value}       
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
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