import {observable, computed, action} from 'mobx';
import firebase from 'firebase';
import {status, json, entitiesFromFB} from '../helpers/utils';


/**
 * computed дикоратор который отробатывает каждый раз при изменении данных
 */
class Currency{
    @observable loading = false
    @observable loaded = false

    @observable entities = {}

    @computed get list(){
        return Object.values(this.entities);
    }

    @computed get length(){
        return Object.keys(this.entities).length;
    }

    @action loadAll(){
        this.loading = true;
        firebase.database().ref('events')
            .once('value', data => {
                this.entities = entitiesFromFB(data.val())
                this.loading = false;
                this.loaded = true;
            })
            .catch(data=> console.log('---', data))
    }
}

export default Currency;