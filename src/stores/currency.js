import {observable, computed} from 'mobx';
import {status, json} from '../helpers/utils';
import {entitiesFromFB} from '../helpers/utils';
import firebase from 'firebase';

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

    loadAll(){
        this.loading = true;

        firebase.database().ref('events').on('value', data => {
            this.entities = entitiesFromFB(data.val);
            this.loading = false;
        });
    }
}

export default new Currency();