import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Dimensions, FlatList, StyleSheet, Text, Linking } from 'react-native';
import { observer, inject } from 'mobx-react';
import Loader from '../../common/Loader';
import {Ionicons} 	from '@expo/vector-icons';
import { timeFormat } from 'd3-time-format';
import Colors from '../../common/Colors';
import Header from '../../common/Header';


const dateFormat = timeFormat('%d, %B, %Y');
const {height, width} = Dimensions.get('window');

@inject('news')
@observer
export default class NewsListScreen extends Component {
  static propTypes = {
  };

  static navigationOptions = ({screenProps}) => {
    
    return {
      headerTitle: <Header styleText={styles.menu} value='Новости'/>,
      tabBarIcon 	: ({ focused }) => {
				return (
					<Ionicons
            color={ focused ? '#176ced' : '#444'}
						name 	= 'ios-paper-outline'
						size 	= {32}
					/>
				);
			} ,
      title: 'Новости',
      headerStyle: { 
        backgroundColor: Colors.palatinateBlue 
      }
    }
  };

  componentDidMount(){
    const {news} = this.props;
    if(!news.loading) news.loadAll();
  }

  separator = (section, row) => {
    return <View key={section + '-' + row } style={styles.separator}/>
  }

  renderItem = ({index, item}) => {
    const date = Date.parse(item.pubdate);
    return (
      <TouchableOpacity onPress={() => (Linking.openURL(item.link))}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <Ionicons
              color={Colors.facebookBlue}
              name='md-book'
              size={40}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.textHeader}>{item.title}</Text>
            <Text style={styles.textContent}>{item.description}</Text>
            <Text style={styles.textDate}>{dateFormat(date)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }



  render() {
    const {news} = this.props;
    if(news.loading) return <Loader/>
    return (
      <View style={styles.container}>
        <FlatList
          data={news.entities}
          ItemSeparatorComponent={this.separator}
          keyExtractor={(item, index) => index}      
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  item:{
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.lightBackground
  },
  view: {
    flexDirection: 'row'
  },
  icon:{
    marginRight: 10
  },
  content: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexGrow: 1
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.border
  },
  menu:{
    fontWeight: '300'
  },
  textHeader: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: Colors.darkText,
    fontSize: 14,
    marginBottom: 4
  },
  textDate: {
    fontSize: 10,
    color: Colors.inactiveText,
    fontWeight: '300',
  },
  textContent: {
    fontSize: 10,
    color: Colors.lightText,
    fontWeight: '300',
    marginBottom: 4
  },
  
  link:{
    flex: 1,
    color: Colors.facebookBlue,
    fontSize: 14,
    marginRight:5,
    paddingTop:1,
    textAlign:'right'
  },
});