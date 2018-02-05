import {StackNavigator} from 'react-navigation';
import Auth from './screens/Auth';

const AppNavigator = StackNavigator({
    auth: {
        screen: Auth
    },
});

export default AppNavigator;