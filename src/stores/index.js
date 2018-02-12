import Currency from './Currency';
import AuthStore  from './Auth';
import NavigationStore  from './Navigation';
import PeopleStore from './People';

const stores = {};

export const auth = new AuthStore(stores);
/**
 * https://github.com/infinitered/ignite/issues/1225
 * Не хватает метода addListener 
 * Эта фича добавлена в релиз > 28
 */
export const navigation = new NavigationStore(stores);
export const currency = new Currency(stores);
export const people = new PeopleStore(stores);

stores.auth = auth;
stores.navigation = navigation;
stores.currency = currency;
stores.people = people;

export default stores;