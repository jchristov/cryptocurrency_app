import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {
    SectionList,
    ActivityIndicator, 
    TouchableOpacity, 
    VirtualizedList, 
    FlatList, 
    View, 
    StyleSheet,
    Text
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';
import Loader from '../common/Loader';
import Colors from '../common/Colors';

@inject('coins')
@inject('search')
@observer
class CoinList extends Component {
  static propTypes = {
    coins: PropTypes.object
  };

  componentWillMount() {
    const {coins} = this.props
    if (!coins.loaded && !coins.loading) coins.loadApi();
  }

  getItemCount = () => {
    return this.props.coins.entities.length;
  }

  getItem = (data, index) => {
    return this.props.coins.entities[index];    
  }
  
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Rank</Text>
        <Text style={styles.text}>24H</Text>
        <Text style={styles.text}>7D</Text>
        <Text style={styles.text}>Price</Text>
      </View>
    );
  }
  
  handleLoadMore = () => {
    console.log('load more')
    this.props.coins.lazyLoadApi();
  }

  handleRefresh = () => {
    this.props.coins.refreshEntities();
  }

  renderFooter = () => {
    return (
      <View style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="small" />
      </View>
    );
  }

  renderSeparator = () => {
    return(
      <View
        style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
        }}
      />
    );
  }

  renderItem = ({index, item}) => {
    const {onCoinPress} = this.props;
    
    console.log('----', item);
    
    return(
      <TouchableOpacity onPress={ onCoinPress.bind(null, item.coin) }>
        <CoinCard coin={item.coin}/>
      </TouchableOpacity>
    );
  }

  separator = (section, row) => {
    return <View key={section + '-' + row } style={styles.separator}/>
  }

  render() {
    const {coins, search} = this.props;
    if(coins.loading) return <Loader/>
    
    /*const data = search.value  
                  ? coins.entities
                      .filter(item => {
                        return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 
                              || item.symbol.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
                      })
                      .map(item => ({key: item.id, coin: item})) 
                  : coins.entities
                      .map(item => ({key: item.id, coin: item}));
    */
    
    console.log(coins.sections);
                      

    return (
      <FlatList 
        data={coins.sections}
        renderItem = {this.renderItem}
        keyExtractor={item => item.key}
        ListFooterComponent={this.renderFooter}
        ItemSeparatorComponent={this.separator}
        refreshing={coins.refreshing}
        onRefresh={this.handleRefresh}

        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}                 
      />
    );
  }
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: Colors.lightBackground
  },
  text:{
    flex: 1, 
    fontSize: 16,
    textAlign: 'center',
    color: Colors.actionText,
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.border,
  },
  header:{
    backgroundColor: Colors.lightBackground,
    borderBottomColor:Colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  }
});

export default CoinList;