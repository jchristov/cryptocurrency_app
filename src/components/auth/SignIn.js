import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import userStore from '../../stores/user';
import firebase from 'firebase';

/**
 * observer это метод который заворачивает 
 * метод render в autorun реакцию которая 
 * каждый раз будет перестраивать компонент
 * 
 * изменения будут происходить синхронно не как setState
 * setState это асинхронно 
 */

@observer
class SignIn extends Component {
    static propTypes = {

    };
    
    render() {
        return (
            <View>
                <Text style = {styles.header}>Please Sign In</Text>
                
                <Text>Email:</Text>
                <TextInput value={userStore.email} 
                           onChangeText={this.setEmail} 
                           style={styles.input}
                           keyboardType='email-address'
                />
                
                <Text>Password:</Text>
                <TextInput value={userStore.password} 
                           onChangeText={this.setPassword} 
                           style={styles.input}
                           secureTextEntry
                />
                <TouchableOpacity onPress={this.signIn}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        )
    }

    signIn = () => {

        
        console.log('---', 'sign in');
    }

    setPassword = password => userStore.password = password
    setEmail = email => userStore.email = email
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
