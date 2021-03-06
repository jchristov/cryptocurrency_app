import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Image, View, Platform } from 'react-native';
import Colors from '../common/Colors';

class Header extends Component {
    static propTypes = {
        value: PropTypes.string
    };

    render() {
        const {value, uri, styleText, styleContainer} = this.props;
        return (
            <View style={[styles.container, styleContainer]}>
                {uri && <Image style={styles.image} source={{uri: uri}}/>} 
                <Text style = {[styles.text, styleText]}>
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
        alignItems: 'center',
        ...Platform.select({
            ios: {
            },
            android: {
              padding: 10
            }
        })
    },
    text: {
        fontSize: 21,
        color: Colors.white,
        fontWeight: '600'
    },
    image: {
        width: 32,
        height: 32
    }
});

export default Header;