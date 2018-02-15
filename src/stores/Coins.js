import EntitiesStore, {loadApi} from './EntitiesStore';
import {observable, computed, action} from 'mobx';

export default class CoinsStore extends EntitiesStore{  
    
    constructor(...args){
        super(...args);
    }

    @action loadApi = loadApi();

    @action setStart = (start) => {
        this.start = start;
    }  
}