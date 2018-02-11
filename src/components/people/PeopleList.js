import React, { Component } from 'react';
import {View, SectionList, Text} from 'react-native';
import groupBy from 'lodash/groupBy';
import PersonCard from './PersonCard';

export default class PeopleList extends Component {
    render() {
        const {peoples} = this.props;

        const grouped = groupBy(peoples, person => person.firstName.charAt(0));

        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.uid, person}))
        }));

        return (
            <SectionList
                sections={sections}
                renderSectionHeader = {({section}) => <Text>{section.title}</Text>}
                renderItem = {({item}) => <PersonCard person = {item.person} />}
            />
        );
    }
}
