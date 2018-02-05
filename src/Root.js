import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SignIn from './components/auth/SignIn'

export default class Root extends Component{
    render(){
        return(
            <View>
                <SignIn/>            
            </View>
        );
    }
}