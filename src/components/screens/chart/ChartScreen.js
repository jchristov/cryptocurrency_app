import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

class ChartScreen extends Component {


    componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.chart}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

ChartScreen.propTypes = {

};

export default ChartScreen;