import Currency from './currency';
import AuthStore  from './auth';
import NavigationStore  from './navigation';

const stores = {
    auth: new AuthStore(),
    currency: new Currency(),
    navigation: new NavigationStore()
};

export default stores;