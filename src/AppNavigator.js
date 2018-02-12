import {StackNavigator, TabNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import CurrencyListScreen from './components/screens/currency/CurrencyListScreen';
import CurrencyScreen from './components/screens/currency/CurrencyScreen';
import PeopleListScreen from './components/screens/people/PeopleListScreen';
import ShowMap from './components/screens/ShowMap';
import PersonPhotoScreen from './components/screens/people/PersonPhotoScreen';

const ListsNavigator = TabNavigator({
    currencyList: {
        screen: CurrencyListScreen
    },
    people: {
        screen: PeopleListScreen
    }
});

const AppNavigator = StackNavigator({
    lists: {
        screen: ListsNavigator
    },
    auth: {
        screen: SignInScreen
    }, 
    currency: {
        screen: CurrencyScreen
    },
    map: {
        screen: ShowMap
    },
    personPhoto: {
        screen: PersonPhotoScreen
    }
});

export default AppNavigator;