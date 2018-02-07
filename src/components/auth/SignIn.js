import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react';
import {action} from 'mobx';

/**
 * observer это метод который заворачивает 
 * метод render в autorun реакцию которая 
 * каждый раз будет перестраивать компонент при изменении стора
 * 
 * изменения будут происходить синхронно не как setState
 * setState это асинхронно 
 */

@inject('auth')
@observer
class SignIn extends Component {
    static propTypes = {

    };
    
    render() {
        const {auth} = this.props;
        return (
            <View>
                <Text style = {styles.header}>Please Sign In</Text>
                
                <Text>Email:</Text>
                <TextInput value={auth.email} 
                           onChangeText={this.setEmail} 
                           style={styles.input}
                           keyboardType='email-address'
                />
                
                <Text>Password:</Text>
                <TextInput value={auth.password} 
                           onChangeText={this.setPassword} 
                           style={styles.input}
                           secureTextEntry
                />
                <TouchableOpacity onPress={auth.signIn}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }
    //this.props.navigation.navigate('currencyList');
    @action setPassword = password => this.props.auth.password = password
    @action setEmail = email => this.props.auth.email = email
}


/**
 * react native для каждого стиля создает ID 
 * пересылает их 1 раз через мост
 * а потом обращается по ID
 * и в итоге это все хорошо по Perfomance
 * нежели создать просто обьект со стилем 
 */
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input:{
        ...Platform.select({
            ios: {
                borderBottomColor: '#000',
                borderBottomWidth: 1
            },
            android: {
                
            }
        })
        
    }
});

export default SignIn;
