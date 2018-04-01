import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { numberFormat } from '../../helpers/utils';

class Integer extends Component {
    render() {
        const {value} = this.props;
        const number = value ? !isNaN(value) : false;
        let prefix = this.props.prefix && value ? this.props.prefix : '';
        let suffix = this.props.suffix && value ? this.props.suffix : '';
        
        let text = number ? prefix + numberFormat(value) + suffix : value;
        let style = this.props.type === 'highlight' && number ? value > 0 ? {color: '#03a15b'} : {color:'#da452f'} : {};
        
        return (
            <Text numberOfLines={1} style= {[styles.text, this.props.style, style]}>
                {text}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    }
});

Integer.propTypes = {
    
};

export default Integer;