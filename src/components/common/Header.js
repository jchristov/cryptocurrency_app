import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Image, View } from 'react-native';
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
        alignItems: 'center'
    },
    text: {
        fontSize: 21,
        color: Colors.white,
        fontWeight: 'bold'
    },
    image: {
        width: 32,
        height: 32
    }
});

export default Header;