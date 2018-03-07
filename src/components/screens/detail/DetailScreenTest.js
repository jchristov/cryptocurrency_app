import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ChartList from '../../chart/ChartList';
import {observer, inject} from 'mobx-react';
import Back from '../../common/Back';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import images from '../../helpers/images';
import { timeFormat } from 'd3-time-format';

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
            title: 'Детали',
            headerTitle: <Header style={styles.title} value='Детали'/>,
            headerStyle: { 
                backgroundColor: Colors.palatinateBlue,
                borderBottomWidth: 1,
                color: Colors.white 
            },
            headerLeft: <Back onBackPress={_goBack}  value="Назад" />
        }
    };

    componentDidMount(){
        const { navigation, graphs } = this.props;   
        const uid = navigation.state.params.uid;
        graphs.loadGraphs(uid);
    }
       
    getLoader = () => {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size='large'/>
            </View>
        );
    }

    render() {
        const {graphs, navigation} = this.props;
        const coinName = navigation.state.params.uid;
        const format = timeFormat('%B %d, %Y');

        if(!graphs.loaded) return this.getLoader();    
        const newData = graphs.entities.prices.usd.map(item=>({time: format(item[0]), price: item[1]}))

        return (
            <View style={styles.contanier}>
                <Header value={coinName} uri={images.currencies.medium_img(coinName)} />
                <ChartList data={graphs.entities.prices.usd}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contanier:{
        flex: 1,
        flexDirection: 'column',
        height: 300,
        backgroundColor: Colors.bianca
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    title:{
        fontWeight: '300'
    }
});