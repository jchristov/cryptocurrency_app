import EntitiesStore from './EntitiesStore';
import {observable, computed, action} from 'mobx';
import {status, json, getPriceMultiFullUri} from './utils';
import {api} from '../apiConfig';

class CoinsStore extends EntitiesStore{  
    @observable refreshing = false;
    @observable startAt = 0;
    constructor(...args){
      super(...args);
      this.limit = 20;
      this.api = api;
    }

    @computed get arrList(){
      return this.entities.map(item => ({key: item.id, arr}));
    }

    @computed get sections(){
      const raw = this.entities.RAW;
      const display = this.entities.DISPLAY;
      
      return Object.keys(raw).map(itm => (Object.assign({key: itm}, raw[itm].USD)));    
    }

    makeApiRequest = () => {
      const uri = getPriceMultiFullUri();
      super.makeApiRequest(uri)
        .then(this.setParams)
        .catch(err => console.error('lazy load error component Coins', err));
    }

    @action setParams = (entities) => {
      this.loading = false;
      this.loaded = true;
      this.refreshing = false;
      //this.entities =  this.startAt === 0 ? entities : [...this.entities, ...entities];
      this.entities = entities;
    }

    @action loadApi(){
      this.loading = true;
      this.makeApiRequest();
    }

    @action lazyLoadApi(){
      this.startAt = Number(this.startAt) + Number(this.limit);
      this.makeApiRequest();
    }

    @action refreshEntities(){
      this.refreshing = true;
      this.startAt = 0;
      this.makeApiRequest();
    }
}

export default CoinsStore;