import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text} from 'react-native';

export default class ChartPrice extends Component {
    static propTypes = {
    };

    render() {
        let cells = this.props.data.map (( item , index ) => {
			return (
				<View 
					key={index}
					style={styles.cell}
				>
					<Text style = { styles.text }>
						{ item }
					</Text>
				</View>
			);
		});

        return (
            <View style={styles.container}>
                {cells}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cell:{
        flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
    },
    text:{
        color: 'black',
        fontSize: 10,
        padding: 2,
        textAlign: 'right'
    },
    container: {
        borderColor: '#cdcdcd',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        height: 230,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 5
    }
});