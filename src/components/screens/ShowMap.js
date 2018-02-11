import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MapView, Permissions, Location} from 'expo';
import {View, StyleSheet, Text} from 'react-native';
import { observable, action, useStrict } from 'mobx';
import { observer } from 'mobx-react';

/**
 * observable это дикоратор который заворачивает метод render в autorun
 * 
 * autorun - запускает функцию и смотрит на все имеющиеся зависимости
 * и если они поменялись перестраивает Virtual DOM с новыми данными 
 */
@observer
export default class ShowMap extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Map'
    };

    @observable permissionAsked = false;
    @observable permissionGranted = false;
    @observable coords = null;

    async componentDidMount(){
        const {status} = await Permissions.askAsync(Permissions.LOCATION)
        this.grantPermission(status);
        const location =  await Location.getCurrentPositionAsync();
        this.setLocation(location);
    }   

    @action grantPermission(status){
        this.permissionAsked = true;
        this.permissionGranted = status === 'granted';
    }

    @action setLocation(location){
        this.coords =  location.coords;
    }

    render() {
        if(!this.permissionAsked) return <Text>Not asked</Text>
        if(!this.permissionGranted) return <Text>Access denied</Text>
        if(!this.coords) return null;
        return (
            <MapView 
                style = {styles.map} 
                initialRegion = {{
                    ...this.coords,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.5
                }}
            >
                <MapView.Marker coordinate = {this.coords} title='our place' />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
