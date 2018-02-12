import React, { Component } from 'react';
import {View, SectionList, Text, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import PersonCard from './PersonCard';
import {observer, inject} from 'mobx-react';
import {email, web, text} from 'react-native-communications';

@inject('people')
@observer
export default class PeopleList extends Component {
    static defaultProps = {
        onPersonPress: () => {}
    };

    componentDidMount() {
        const {people} = this.props
        if (!people.loaded) people.loadAll()
    }

    render() {
        const {people, onLongPress} = this.props;
        if(people.loading) return <ActivityIndicator size='large'/>

        return (
            <SectionList
                sections={people.sections}
                renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
                renderItem = {({item}) => <TouchableOpacity onPress={this.handlePress} 
                                                            onLongPress = {onLongPress.bind(null, item.key)}
                > 
                    <PersonCard person = {item.person} />
                </TouchableOpacity>}
            />
        );
    }

    handlePress = () => {
        //text('+123456789', 'event notification');
        //web('http://hello.world')
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
});
