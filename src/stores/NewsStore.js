import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {action, useStrict} from 'mobx';
import { getNewsUrl, status, parseXml } from './utils';

const headers = {
  Accept 	: 'text/xml',
  headers : {
    'Content-Type' : 'text/xml'
  },
  method : 'GET'
};

class NewsStore extends EntitiesStore {
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

  @action loadAll = () => {
    this.uri = getNewsUrl();
    this.loading = true;
    this.makeApiRequest();
  }

  @action setParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = entities;
  }
}


export default NewsStore;