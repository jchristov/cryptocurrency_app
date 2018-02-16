import EntitiesStore from './EntitiesStore';
import {observable, computed, action} from 'mobx';
import {status, json} from './utils';

export default class CoinsStore extends EntitiesStore{  
    @observable refreshing = false;
    @observable start = 0;
    constructor(...args){
        super(...args);
        this.limit = 20;
    }

    @computed get arrList(){
        return this.entities.map(item => ({key: item.id, arr}));
    }

    @action loadApi = () => {
            this.loading = true;
            fetch(`https://api.coinmarketcap.com/v1/ticker/?start=${this.start}&limit=${this.limit}`)
                .then(status)
                .then(json)
                .then(entities => {
                    this.entities = entities;
                    this.loading = false;
                    this.loaded = true;
                })
                .catch(err => console.error(err));
    }

    @action lazyLoadApi = () => {
        fetch(`https://api.coinmarketcap.com/v1/ticker/?start=${this.start}&limit=${this.limit}`)
        .then(status)
        .then(json)
        .then(newEntities => {
            this.entities = this.entities.push(newEntities);
        })
        .catch(err => console.error(err));
    }

    @action setStart(){
        this.start = Number(this.start) + Number(this.limit);
    }
    
}