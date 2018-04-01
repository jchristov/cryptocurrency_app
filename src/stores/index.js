import Events from './Events';
import AuthStore  from './AuthStore';
import NavigationStore  from './Navigation';
import PeopleStore from './People';
import CoinsStore from './CoinsStore';
import Graphs from './Graphs';
import SearchStore from './SearchStore';
import Charts from './Charts';
import PortfolioStore from './PortfolioStore';
import NewsStore from './NewsStore';

const stores = {};

export const auth = new AuthStore(stores);
/**
 * https://github.com/infinitered/ignite/issues/1225
 * Не хватает метода addListener в navigation
 * Эта фича добавлена в релиз > 28
 */
export const navigation = new NavigationStore(stores);
export const events = new Events(stores);
export const people = new PeopleStore(stores);
export const coins = new CoinsStore(stores);
export const graphs = new Graphs(stores);
export const search = new SearchStore(stores);
export const charts = new Charts(stores);
export const portfolio = new PortfolioStore(stores);
export const news = new NewsStore(stores);

stores.auth = auth;
stores.navigation = navigation;
stores.events = events;
stores.people = people;
stores.coins = coins;
stores.graphs = graphs;
stores.search = search;
stores.charts = charts;
stores.portfolio = portfolio; 
stores.news = news;

export default stores;