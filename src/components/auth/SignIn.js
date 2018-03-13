import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, Platform, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
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
      <View style = {styles.container}>
        <View>
            <Text style = {styles.text}>Email:</Text>
            <TextInput value = {auth.email}
                      onChangeText = {this.handleEmailChange}
                      keyboarType = 'email-address'
                      style = {styles.input}
            />
        </View>
        <View>
            <Text style = {styles.text}>Password:</Text>
            <TextInput value = {auth.password}
                      onChangeText = {this.handlePasswordChange}
                      secureTextEntry
                      style = {styles.input}
            />
        </View>
        <TouchableOpacity onPress = {auth.signIn}>
            <Text>Submit</Text>
        </TouchableOpacity>
      </View>
  )
  }
  //this.props.navigation.navigate('eventList');
  @action handlePasswordChange  = password => this.props.auth.password = password
  @action handleEmailChange  = email => this.props.auth.email = email
}


/**
 * react native для каждого стиля создает ID 
 * пересылает их 1 раз через мост
 * а потом обращается по ID
 * и в итоге это все хорошо по Perfomance
 * нежели создать просто обьект со стилем 
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontWeight: 'bold'
  },
  input: Platform.select({
    ios: {
        borderBottomWidth: 1
    },
    android: {

    }
  })
});

export default SignIn;
