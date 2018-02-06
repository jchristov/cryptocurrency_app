import {observable} from 'mobx';


/**
 * observable это дикоратор 
 */
class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null
}

export default AuthStore ;