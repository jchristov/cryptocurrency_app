import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ChartList from '../../chart/ChartList';
import {observer, inject} from 'mobx-react';
import { Card } from 'react-native-elements'

@inject('graphs')
@observer
export default class DetailScreen extends Component {
    
    static propTypes = {
    };

    static navigationOptions = {
        title: 'Currency Detail'
    };
    
    componentDidMount(){
        const { navigation, graphs } = this.props;
        const uid = navigation.state.params.uid;
        graphs.loadGraphs(uid);
    }
       
    getLoader = () => {
        return <View><ActivityIndicator size='large'/></View>;
    }

    render() {
        const {graphs} = this.props;
        if(!graphs.loaded) return this.getLoader();
        
        return (
            <View style={styles.contanier}>
                <ChartList data={graphs.entities.prices.usd}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanier:{
        borderTopWidth: 1,
        flex: 1,
        flexDirection: 'column',
        height: 300
    }
})