import {observable} from 'mobx';


/**
 * observable это дикоратор 
 */
class User {
    @observable email: ''
    @observable password: ''

    user: null
}

export default User;