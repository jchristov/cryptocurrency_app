import {StackNavigator} from 'react-navigation';
import Auth from './screens/Auth';
import CurrencyScreen from './screens/currencies/CurrencyScreen';
import CurrencyListScreen from './screens/currencies/CurrencyListScreen';

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