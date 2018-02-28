import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet, TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {observer, inject} from 'mobx-react';

@inject('search')
@observer
export default class SearchInput extends Component {
    static propTypes = {
    
    };

    handleClose = () => {
        if(this.props.search.toggleOpen){
            this.props.search.toggleOpen();
        }
    }

    handleChange = (value) => {
        if(this.props.search.setValue){
            this.props.search.setValue(value);
        }
    }

    handleReset = () => {
        if(this.props.search.setValue){
            this.props.search.setValue(null);
        }
    }

    render() {
        const {search} = this.props;
        
        if(!search.isOpen) return null;
        
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.refresh} onPress={this.handleReset}>
                        <Ionicons name="ios-refresh-outline" size={32} color="black"/>
                    </TouchableOpacity>    
                    <TextInput  
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        style={styles.input} 
                        selectionColor='#176ced'
                        placeholder="Please enter a search term" 
                        placeholderTextColor="#444"
                        onChangeText={this.handleChange}
                        value={search.value}
                    />
                    <TouchableOpacity style={styles.close} onPress={this.handleClose}>
                        <Ionicons name="ios-close-outline" size={32} color="black"/>
                    </TouchableOpacity>    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#fad76f',
        backgroundColor: '#fff',
        height: 40,
        paddingTop: 5,
        paddingBottom: 5
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input:{
        backgroundColor: '#fff',
        borderColor: '#fad76f',
        borderRadius: 3,
        borderWidth: 1,
        color: '#545454',
        flex: 1,
        margin: 5,
        height: '100%',
        fontSize: 14,
        paddingHorizontal: 5
    },
    refresh:{
        marginLeft: 10,
        marginRight: 5,
        marginTop: 3  
    },
    close:{
        marginLeft: 5,
        marginRight: 10,
        marginTop: 3  
    }
});
