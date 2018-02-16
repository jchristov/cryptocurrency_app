import EntitiesStore, {loadApi} from './EntitiesStore';
import {observable, computed, action} from 'mobx';

export default class CoinsStore extends EntitiesStore{  
    @computed get arrList(){
        return this.entities.map(item => ({key: item.id, arr}));
    }

    @action loadApi = loadApi();

    @action setStart = (start) => {
        this.start = start;
    }  
    
}