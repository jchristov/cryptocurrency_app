import {StackNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignIn';
import CurrencyScreen from './components/screens/currency/CurrencyScreen';
import CurrencyListScreen from './components/screens/currency/CurrencyListScreen';

const AppNavigator = StackNavigator({
    currencyList: {
        screen: CurrencyListScreen
    },
    auth: {
        screen: SignInScreen
    },
    currency: {
        screen: CurrencyScreen
    }
});

export default AppNavigator;