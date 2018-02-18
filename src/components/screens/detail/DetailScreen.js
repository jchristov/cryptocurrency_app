import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import ChartList from '../../chart/ChartList';
import {observer, inject} from 'mobx-react';

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
        

        return <ChartList 
                    data={graphs.entities.prices.usd}
                /> 
    }
}