import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PortfolioList from '../../portfolio/PortfolioList';
import {
  View, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  Text, 
  FlatList
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {Ionicons} 	from '@expo/vector-icons';
import Loader from '../../common/Loader';
import Header from '../../common/Header';
import Colors from '../../common/Colors';
import SearchIcon from '../../search/SearchIcon';
import SearchInput from '../../search/SearchInput';
import PortfolioCard from '../../portfolio/PortfolioCard';

@inject('portfolio')
@observer
class PortfolioListScreen extends Component {
    static propTypes = {
      coins: PropTypes.object
    };

    static navigationOptions = ({navigation, screenProps}) => {
      return { 
        headerTitle: <Header styleText={styles.title} value='Портфель'/>,
        headerRight: <SearchIcon />,    
        tabBarIcon: ({ focused }) => {
            return <Ionicons
              name="ios-briefcase-outline"
              size={32}
              color={ focused ? '#176ced' : '#444'}
            />
        },
        title: 'Портфель',
        headerStyle: { 
            backgroundColor: Colors.palatinateBlue 
        } 
      }
    };

    componentDidMount(){
      const {portfolio} = this.props;
      if(!portfolio.loaded && !portfolio.loading) portfolio.loadPriceMultiFull();
    }
    
    separator = (section, row) => {
      return <View key={section + '-' + row } style={styles.separator}/>
    }
  

    _renderItem = ({index, item}) => {
      return(
        <TouchableOpacity onPress={this.handleCoinPress.bind(null, item.FROMSYMBOL)}>
          <PortfolioCard coin={item}/>
        </TouchableOpacity>
      );
    }


    render() {
      const {portfolio} = this.props;
      
      if(portfolio.loading) return <Loader/>

      return (
          <FlatList
            style={styles.container}
            data={portfolio.entities}
            renderItem = {this._renderItem}
            keyExtractor={item => item.key}
            ItemSeparatorComponent={this.separator}
          />
      );
    }

    handleCoinPress = (uid) => {
      this.props.navigation.navigate('detail', {uid});
    }
}

const styles = StyleSheet.create({
  title:{
    fontWeight: "300"
  },
  container: {
    backgroundColor: Colors.lightBackground
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.border
  },
});

export default PortfolioListScreen;