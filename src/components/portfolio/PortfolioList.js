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
    StyleSheet
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import PortfolioCard from './PortfolioCard';
import Loader from '../common/Loader';
import Colors from '../common/Colors';

@inject('coins')
@observer
class PortfolioList extends Component {
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
        return <SearchBar   containerStyle={styles.search} 
                            placeholder="Enter Currency Name..." 
                            lightTheme round 
                />
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
              <ActivityIndicator animating size="large" />
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

    _renderItem = ({index, item}) => {
        const {onCoinPress} = this.props;
        return(
            <TouchableOpacity onPress={onCoinPress.bind(null, item.coin.id)}>
                <PortfolioCard coin={item.coin}/>
            </TouchableOpacity>
        );
    }


    render() {
        const {coins} = this.props;

        if(coins.loading)return <Loader/>

        const data = coins.entities.map(item => ({key: item.id, coin: item}));
        return <FlatList 
                    data={data}
                    renderItem = {this._renderItem}
                    keyExtractor={item => item.key}
                    ListFooterComponent={this.renderFooter}
                    style={styles.container}
      
                    refreshing={coins.refreshing}
                    onRefresh={this.handleRefresh}

                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}                 
                />
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBackground
    },
    search: {
        backgroundColor: Colors.lightBackground
    }
});

export default PortfolioList;