import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PersonPhoto from '../../people/PersonPhoto';

export default class PersonPhotoScreen extends Component {
    static propTypes = {
    };

    render() {
        const {navigation} = this.props;
        const uid = navigation.state.params.uid;

        return <PersonPhoto uid = {uid} />
    }
}
