import Events from './Events';
import AuthStore  from './Auth';
import NavigationStore  from './Navigation';
import PeopleStore from './People';
import Coins from './Coins';

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
export const coins = new Coins(stores);

stores.auth = auth;
stores.navigation = navigation;
stores.events = events;
stores.people = people;
stores.coins = coins;

export default stores;