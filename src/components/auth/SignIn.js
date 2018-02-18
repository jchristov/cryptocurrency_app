import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react';
import {action} from 'mobx';
import {FormLabel, FormInput, Card, Button} from 'react-native-elements';

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
                <Card>
                    <Text style = {styles.header}>Please Sign In</Text>
                    
                    <FormLabel>Email:</FormLabel>
                    <FormInput value={auth.email} 
                               onChangeText={this.setEmail} 
                               inputStyle={styles.input}
                               keyboardType='email-address'
                    />
                    
                    <FormLabel>Password:</FormLabel>
                    <FormInput value={auth.password} 
                            onChangeText={this.setPassword} 
                            inputStyle={styles.input}
                            secureTextEntry
                    />

                    <Button
                        title="Sign In"
                        textStyle={styles.btnText}
                        buttonStyle={styles.btn}
                    />
                </Card>
            </View>
        )
    }
    //this.props.navigation.navigate('eventList');
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
                
            },
            android: {
                
            }
        })
    },
    btn:{
        backgroundColor: "rgba(92, 99,216, 1)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 40,
        
    },
    btnText:{
        color: "white",
        fontWeight: "700",
    }

});

export default SignIn;
