import {observable} from 'mobx';
import BasicStore from './BasicStore';
import firebase from 'firebase';
import {action, autorun} from 'mobx';

/**
 * observable это дикоратор который заворачивает метод render в autorun
 * 
 * autorun - запускает функцию и смотрит на все имеющиеся зависимости
 * и если они поменялись перестраивает Virtual DOM с новыми данными 
 */
class AuthStore extends BasicStore {
    @observable email = '';
    @observable password = '';
    @observable user = null;
    
    constructor(...args){
        super(...args);

        firebase.auth().onAuthStateChanged(user => {    
            this.setUser(user);
        });
        
        let initRedirect = false;

        autorun(() => { 
            const routeName = this.user ? 'coins' : 'auth';
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
            .then(this.setUser)
            .catch(err => console.error(err));
    }

    @action setUser = (user) => {
        this.user = user;
        this.email = '';
        this.password = '';
    }
}

export default AuthStore ;  