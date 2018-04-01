import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {action, useStrict} from 'mobx';
import { getNewsUri, status, parseXml } from './utils';

const headers = {
  Accept 	: 'text/xml',
  headers : {
    'Content-Type' : 'text/xml'
  },
  method : 'GET'
};

class NewsStore extends EntitiesStore {
  /*
  ! Deprecated устарешее Api для получения новостей 
  makeApiRequest(){
    fetch(this.uri, headers)
      .then(status)
      .then(res => res.text ())
      .then(data => {
        const response = parseXml(data);
        this.setParams(response);
      })
      .catch(err => console.log(err))
  }
  */

  makeApiRequest = () => {
    return new Promise((resolve, reject) => {
      const uri = getNewsUri();
      super.makeApiRequest(uri)
        .then(response => {
          this.setParams(response);
          resolve(true);
        })
        .catch(err =>{
          reject(err);
          console.log('Error load news', err)
        });
    });
  }

  @action loadAllNews = async() => {
    this.loading = true;
    await this.makeApiRequest();
  }

  @action setParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = entities;
  }
}

export default NewsStore;