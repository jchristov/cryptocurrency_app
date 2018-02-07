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
            /**
             * Весь этот код по-хорошему должен находиться в сторе navigation,
             * но т.к не получилось добавить navigation в стор, пока только так
             * новый апдейт react-navigation требует указать addListener, для mobx решения не нашел.
             * 
             * https://github.com/react-navigation/react-navigation/issues/3416
             */                
            const objStore = this.getStore('navigation');
            objStore.reset('navigation');
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