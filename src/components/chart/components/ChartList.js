import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import ChartPrice from './ChartPrice';
import {observer, inject} from 'mobx-react';

@inject('charts')
@observer
class ChartList extends Component {
  render() {
    return (
      <View>
        <View>
          
        </View>
      </View>
    );
  }
}

ChartList.propTypes = {

};

export default ChartList;