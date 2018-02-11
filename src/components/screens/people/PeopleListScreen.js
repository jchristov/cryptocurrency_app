import React, { Component } from 'react'
import {observer, inject} from 'mobx-react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PeopleList from '../../people/PeopleList';

@inject('people')
@observer 
class PeopleListScreen extends Component {
    
    static navigationOptions = {
        title: 'People List '
    };

    componentDidMount(){
        this.props.people.loadAll();
    }

    render() {
        const {people} = this.props;
        if(people.loading){
            return this.getLoader();
        }
        
        return <PeopleList peoples = {people.list} onPersonPress = {this.handlePress}/>
    }

    handlePress = (uid) => { 
        console.log('---', uid);
        this.props.people.entities[uid].email = 'LALLALALA';
    }    

    getLoader = () => {
        return <View><ActivityIndicator size='large'/></View>
    }
}

const styles = StyleSheet.create({
});

export default PeopleListScreen;