import {StackNavigator, TabNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import CurrencyScreen from './components/screens/currency/CurrencyScreen';
import CurrencyListScreen from './components/screens/currency/CurrencyListScreen';
import PeopleListScreen from './components/screens/people/PeopleListScreen';

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
    }
});

export default AppNavigator;