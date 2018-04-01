import EntitiesStore from './EntitiesStore';
import {observable, computed, action} from 'mobx';
import {status, json} from './utils';
import {api} from '../apiConfig';

export default class CoinsStore extends EntitiesStore{  
  @observable refreshing = false;
  @observable startAt = 0;
  constructor(...args){
    super(...args);
    this.limit = 20;
    this.api = api;
  }

  makeApiRequest = () => {
    return new Promise((resolve, reject) => {
      const uri = `${this.api.domain}${this.api.path}?start=${this.startAt}&limit=${this.limit}`; 
    
      super.makeApiRequest(uri)
        .then(response => {
          this.setParams(response);
          resolve(response);
        })
        .catch(err => {
          console.log('lazy load error CoinsStore', err);
          reject(err);
        });
    });
  }

  @action setParams = (entities) => {
    console.log('-12312312--', entities);
    
    this.loading = false;
    this.loaded = true;
    this.refreshing = false;
    this.entities =  this.startAt === 0 ? entities : [...this.entities, ...entities];
  }

  @action async loadAllCoins(){
    this.loading = true;
    await this.makeApiRequest();
  }

  @action async lazyLoadCoins(){
    this.loading = true;
    this.startAt = Number(this.startAt) + Number(this.limit);
    await this.makeApiRequest();
  }


  @action async refreshEntities(){
      this.refreshing = true;
      this.startAt = 0;
      await this.makeApiRequest();
  }
}