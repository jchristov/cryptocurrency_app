import {StackNavigator, TabNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import EventListScreen from './components/screens/events/EventListScreen';
import EventScreen from './components/screens/events/EventScreen';
import PeopleListScreen from './components/screens/people/PeopleListScreen';
import ShowMap from './components/screens/ShowMap';
import PersonPhotoScreen from './components/screens/people/PersonPhotoScreen';
import CoinListScreen from './components/screens/coins/CoinListScreen';
import DetailScreen from './components/screens/detail/DetailScreen';
import PortfolioListScreen from './components/screens/portfolio/PortfolioListScreen';

const ListsNavigator = TabNavigator({
    coins: {
        screen: CoinListScreen
    },
    portfolio: {
        screen: PortfolioListScreen
    }
});

const AppNavigator = StackNavigator({
    lists:{
        screen: ListsNavigator 
    },
    auth: {
        screen: SignInScreen
    }, 
    detail: {
        screen: DetailScreen
    },
    event: {
        screen: EventScreen
    },
    map: {
        screen: ShowMap
    },
    personPhoto: {
        screen: PersonPhotoScreen
    }
});

export default AppNavigator;