import {observable, computed, action} from 'mobx';
import firebase from 'firebase';
import {entitiesFromFB, status, json} from './utils';
import BasicStore from './BasicStore';

class EntitiesStore extends BasicStore {
  @observable loading = false;
  @observable loaded = false;
  @observable entities = {};

  @computed get list(){
    return Object.values(this.entities);
  }

  @computed get size(){
    return Object.keys(this.entities).length;
  }

  makeApiRequest(uri, headers = {}){    
    return new Promise((resolve, reject) => {
      fetch(uri, headers)
        .then(status)
        .then(json)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });  
    /*return await (await (fetch(uri, headers)
        .then(status)
        .then(json)
        .catch(err => console.log('Error load currency', err))
    ));
    */
  }
}

export function loadAllHelper(refName){
  return function(){
    this.loading = true;

    firebase.database().ref(refName)
      .once('value', data => {
          this.entities = entitiesFromFB(data.val())
          this.loading = false;
          this.loaded = true;
      })
      .catch(err => console.log('Error load data from firebase', err));
  }
}

export default EntitiesStore;