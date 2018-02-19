import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Dimensions } from 'react-native';

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
      },
    container:{
        backgroundColor: "#f9f9f9",
        borderColor: "#cdcdcd",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        height: 230,
        width: 25,
    }
});