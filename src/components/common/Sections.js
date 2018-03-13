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
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })).isRequired,
    title: PropTypes.string,
    style: PropTypes.object
  };

  renderDataList = () => {
    const {data, style} = this.props;
    console.log(style.text);
    
    
    return data.map((item, index) => {
      return (
        <View key={index} style={styles.containerList}>
          <Text style={[styles.title, style.text]}>{item.title}</Text>
          <Integer type="highlight" style={[styles.value, style.text]} prefix={item.prefix} value={item.value}/>
        </View>
      );
    });
  }

  render() {
    const {title, style, key} = this.props;
    return (
      <View style={styles.container} key={key}>
        <Header 
          styleText={styles.textHeader}
          styleContainer={styles.containerHeader}
          value={title}
        />
        <View style={style.container}>
          {this.renderDataList()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingBottom: 8
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
    color: Colors.inactiveText,
    fontSize: 12,
  },
  value: {
    color: Colors.darkText,
    fontSize: 12,
    fontWeight: 'bold'
  },
  textHeader: {
    color: Colors.darkText,
    padding: 8,
    fontSize: 16,
    fontWeight: '300' 								
  }
});

export default Sections;