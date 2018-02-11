import {observable} from 'mobx';
import BasicStore from './BasicStore';
import firebase from 'firebase';
import {action, autorun} from 'mobx';

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
            this.setUser(user);
        });
        
        let initRedirect = false;

        autorun(() => {
            console.log('---', this.user);
            const routeName = this.user ? 'lists' : 'auth';
            if(initRedirect){
                const objStore =  this.getStore('navigation');
                objStore.reset(routeName);
            }
            initRedirect = true;
        });
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