import {observable, computed, action} from 'mobx';
import firebase from 'firebase';
import {entitiesFromFB, status, json} from './utils';
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

export function loadApi(){
    return function() {
        this.loading = true;

        fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=3`)
        .then(status)
        .then(json)
        .then(entities => {
            console.log(entities);
            this.entities = entities;
            this.loading = false;
            this.loaded = true;
        })
        .catch(err => console.error(err));
    }
}


export default EntitiesStore;