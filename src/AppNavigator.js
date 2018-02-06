import {StackNavigator} from 'react-navigation';
import Auth from './screens/Auth';
import CurrencyScreen from './screens/currency/CurrencyScreen';
import CurrencyListScreen from './screens/currency/CurrencyListScreen';

const AppNavigator = StackNavigator({
    currencyList: {
        screen: CurrencyListScreen
    },
    auth: {
        screen: Auth
    },
    currency: {
        screen: CurrencyScreen
    }
});

export default AppNavigator;