import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Integer from '../common/Integer';
import Header from '../common/Header';
import Colors from '../common/Colors';

class Sections extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string
    })).isRequired,
    title: PropTypes.string,
  };

  renderDataList = () => {
    const {data} = this.props;
    return data.map((item, index) => {
      return (
        <View key={index} style={styles.containerList}>
          <Text style={styles.title}>{item.title}</Text>
          <Integer type="highlight" style={styles.value} prefix={item.prefix} value={item.value}/>
        </View>
      );
    });
  }

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <Header 
          styleText={styles.textHeader}
          styleContainer={styles.containerHeader}
          value={title}
        />
        {this.renderDataList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
   
  },
  containerHeader: {
    justifyContent: 'flex-start',
  },
  containerList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  title: {
    flex: 1,
    color: Colors.inactiveText,
    fontSize: 12,
  },
  value: {
    color: Colors.darkText,
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold'
  },
  textHeader: {
    color: Colors.darkText,
    padding: 8,
    fontSize: 20,
    fontWeight: '300' 								
  }
});

export default Sections;