import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonPhoto from '../../people/PersonPhoto';
import {observer} from 'mobx-react';

@observer 
export default class PersonPhotoScreen extends Component {
    static propTypes = {
    };

    render() {
        return <PersonPhoto uid = {this.props.navigation.state.params.uid} />
    }
}
