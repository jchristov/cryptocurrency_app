import {observable} from 'mobx';
import BasicStore from './BasicStore';
import firebase from 'firebase';
import {action} from 'mobx';

/**
 * observable это дикоратор 
 */
class AuthStore extends BasicStore {
    @observable email = ''
    @observable password = ''
    @observable user = null
    constructor(...args){
        super(...args);

        firebase.auth().onAuthStateChanged(user => {    
            console.log('===', this.user);
            const objStore = this.getStore('navigation');
            objStore.reset('currencyList');
        })
    }

    signIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(this.setUser);
    }

    @action setUser = (user) => {
        this.user = user;
        this.email = '';
        this.password = '';
    }
}

export default AuthStore ;  