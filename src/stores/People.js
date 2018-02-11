import {action, computed, observable} from 'mobx';
import BasicStore from './BasicStore';
import firebase from 'firebase';
import {entitiesFromFB} from './utils';

export default class PeopleStore extends BasicStore{
    @observable loading = false;
    @observable loaded = false;
    @observable entities = {};

    @computed get list(){
        return Object.values(this.entities);
    }

    @computed get length(){
        return Object.keys(this.entities).length;
    }

    @action loadAll(){
        this.loading = true;

        firebase.database().ref('people')
            .once('value', data => {
                this.entities = entitiesFromFB(data.val());
                this.loading = false;
                this.loaded = true;
            })
            .catch(err=> console.log('--Error load People in Store--', err))
    }


}