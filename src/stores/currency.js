import {observable, computed, action, useStrict} from 'mobx';
import firebase from 'firebase';
import {status, json, entitiesFromFB} from './utils';
//useStrict(true)

/**
 * computed дикоратор который отробатывает каждый раз при изменении данных
 * useStrict если мутации за пределами этого стора то об этом сообщат       
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