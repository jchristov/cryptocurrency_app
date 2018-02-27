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

    render() {
        const {search} = this.props;
        
        if(search.isOpen) return null;
        
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.refresh}>
                        <Ionicons name="ios-refresh-outline" size={32} color="black"/>
                    </TouchableOpacity>    
                    <TextInput  
                        style={styles.input} 
                        selectionColor='#176ced'
                        placeholder="Please enter a search term" 
                        placeholderTextColor="#444"
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
        height: 40 	
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input:{
        backgroundColor: '#fff',
        borderColor: '#fad76f',
        borderRadius: 3,
        borderWidth: 1,
        color: '#545454',
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        margin: 5,
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
