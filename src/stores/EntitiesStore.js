import {observable, computed, action} from 'mobx';
import firebase from 'firebase';
import {entitiesFromFB} from './utils';
import BasicStore from './BasicStore';

class EntitiesStore extends BasicStore {
    @observable loading = false;
    @observable loaded = false;

    @observable entities = {};


    @computed get list(){
        return Object.values(this.entities);
    }

    @computed get size(){
        return Object.keys(this.entities).length;
    }
}

export function loadAllHelper(refName){
    return function(){
        this.loading = true;

        firebase.database().ref(refName)
            .once('value', data => {
                this.entities = entitiesFromFB(data.val())
                this.loading = false;
                this.loaded = true;
            })
            .catch(err => console.log('Error load data from firebase', err));
    }
}

export default EntitiesStore;