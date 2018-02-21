import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ChartList from '../../chart/ChartList';
import {observer, inject} from 'mobx-react';
import { Card } from 'react-native-elements'
import Back from '../../common/Back';
import Header from '../../common/Header';


@inject('graphs')
@observer
export default class DetailScreen extends Component {
    
    static propTypes = {
    };

    static navigationOptions = ({navigation, screenProps}) => {
        _goBack = () => {
            navigation.goBack();
        }
        
        return {
            title: 'Currency Details',
            headerLeft: <Back onBackPress={_goBack}  value="back" />
        }
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
        const {graphs, navigation} = this.props;
        if(!graphs.loaded) return this.getLoader();
        
        return (
            <View style={styles.contanier}>
                <Header value={navigation.state.params.uid} />
                <ChartList data={graphs.entities.prices.usd}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanier:{
        flex: 1,
        flexDirection: 'column',
        height: 300
    }
});