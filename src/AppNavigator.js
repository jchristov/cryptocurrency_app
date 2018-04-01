import {StackNavigator, TabNavigator} from 'react-navigation';
import SignInScreen from './components/screens/auth/SignInScreen';
import EventListScreen from './components/screens/events/EventListScreen';
import EventScreen from './components/screens/events/EventScreen';
import PeopleListScreen from './components/screens/people/PeopleListScreen';
import ShowMap from './components/screens/ShowMap';
import PersonPhotoScreen from './components/screens/people/PersonPhotoScreen';
import DetailScreen from './components/screens/detail/DetailScreen';
import PortfolioListScreen from './components/screens/portfolio/PortfolioListScreen';
import ChartScreen from './components/screens/chart/ChartScreen';
import NewsListScreen from './components/screens/news/NewsListScreen';

const ListsNavigator = TabNavigator({
    portfolio: {
        screen: PortfolioListScreen
    },
    news: {
        screen: NewsListScreen
    }
});

const AppNavigator = StackNavigator({
    main:{
        screen: ListsNavigator 
    },
    detail: {
        screen: DetailScreen
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
    },
    chart: {
        screen: ChartScreen
    }
});

export default AppNavigator;