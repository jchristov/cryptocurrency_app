import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Fonts from '../common/Fonts';

export default class ChartHeader extends PureComponent {
    static propTypes = {
        value: PropTypes.string
    };

    render() {
        const {value, style} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        bottom: -100,
        color: "#333",
        fontSize: 14,
        fontWeight: "bold",
        left: -103,
        transform: [{ 
			rotate: '270deg'
		}],
        width: 230,
    //    fontFamily: Fonts.helvetica
    },
    container:{
      //  backgroundColor: "#f5f5f5",
        borderColor: "#cdcdcd",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 230,
        width: 25,
    }
});