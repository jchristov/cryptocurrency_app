import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import ChartList from '../../chart/ChartList';
import {observer, inject} from 'mobx-react';
import Back from '../../common/Back';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import { getImgUrl } from '../../helpers/utils';

@inject('graphs')
@observer
export default class DetailScreen extends Component {
    
    static propTypes = {
    };

    coinName = this.navigation.state.params.uid;

    static navigationOptions = ({navigation, screenProps}) => {
        _goBack = () => {
            navigation.goBack();
        }
        
        return {
            header: {
                style: {
                    backgroundColor: 'black'
                },
            },
            headerStyle: {
                backgroundColor: '#ffffff',
                borderBottomColor: '#2F95D6',
                borderBottomWidth: 3,
              },
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
        const uri = getImgUrl(this.coinName);

        if(!graphs.loaded) return this.getLoader();
        return (
            <View style={styles.contanier}>
                <Header value={this.coinName} uri={uri} />
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
    },
    header: {
        flex: 1,
        backgroundColor: Colors.bianca
    }
});