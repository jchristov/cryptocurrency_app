import EntitiesStore from './EntitiesStore';
import {observable, computed, action} from 'mobx';
import {status, json} from './utils';

export default class CoinsStore extends EntitiesStore{  
    @observable refreshing = false;
    @observable startAt = 0;
    constructor(...args){
        super(...args);
        this.limit = 20;
    }

    @computed get arrList(){
        return this.entities.map(item => ({key: item.id, arr}));
    }

    makeApiRequest = () => {
        const url = `https://api.coinmarketcap.com/v1/ticker/?start=${this.startAt}&limit=${this.limit}`; 
        fetch(url)
            .then(status)
            .then(json)
            .then(this.setParams)
            .catch(err => console.error('lazy load error component Coins', err));
    }

    @action setParams = (newEntities) => {
        this.entities =  this.startAt === 0 ? newEntities : [...this.entities, ...newEntities];
        this.loading = false;
        this.loaded = true;
        this.refreshing = false;
    }

    @action loadApi(){
        this.loading = true;
        this.makeApiRequest();
    }

    @action lazyLoadApi(){
        this.loading = true;
        this.startAt = Number(this.startAt) + Number(this.limit);
        this.makeApiRequest();
    }

    @action refreshEntities(){
        this.refreshing = true;
        this.startAt = 0;
        this.makeApiRequest();
    }
}