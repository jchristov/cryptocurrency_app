import {StackNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import CurrencyScreen from './components/screens/currency/CurrencyScreen';
import CurrencyListScreen from './components/screens/currency/CurrencyListScreen';

const AppNavigator = StackNavigator({
    auth: {
        screen: SignInScreen
    },
    currencyList: {
        screen: CurrencyListScreen
    },
    currency: {
        screen: CurrencyScreen
    }
});

export default AppNavigator;