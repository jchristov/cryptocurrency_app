import Currency from './Currency';
import AuthStore  from './Auth';
import NavigationStore  from './Navigation';

const stores = {};

export const auth = new AuthStore(stores);
export const navigation = new NavigationStore(stores);

stores.auth = auth;
stores.navigation = navigation;
stores.currency = new Currency(stores);


export default stores;