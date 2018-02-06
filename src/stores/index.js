import Currency from './currency';
import User from './user';

const stores = {
    user: new User(),
    currency: new Currency()
};

export default stores;