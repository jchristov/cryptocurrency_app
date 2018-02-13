import {StackNavigator, TabNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import EventListScreen from './components/screens/events/EventListScreen';
import EventScreen from './components/screens/events/EventScreen';
import PeopleListScreen from './components/screens/people/PeopleListScreen';
import ShowMap from './components/screens/ShowMap';
import PersonPhotoScreen from './components/screens/people/PersonPhotoScreen';

const ListsNavigator = TabNavigator({
    eventList: {
        screen: EventListScreen
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