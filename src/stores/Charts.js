import EntitiesStore from './EntitiesStore';
import { observable, action } from 'mobx';
import { detailsApi } from '../apiConfig';
import { getPriceHistoryUrl } from './utils';

class Charts extends EntitiesStore{

  @observable uid = null;

  constructor(...args){
    super(...args);
    this.detailsApi = detailsApi;
    this.uri = undefined;
  }

  makeApiRequest(){
    super.makeApiRequest(this.uri)
      .then(this.setParams)
      .catch(err => console.error('load error component Charts', err));
  } 

  _formatData = (data) => (data.map(item => ({time: new Date(item.time * 1000), price: item.open})))
  
  @action loadCharts(cryptocurrency, currency, api = 'histoday', timeLimit = '2000'){
    this.uri = getPriceHistoryUrl(cryptocurrency, currency, api, timeLimit);
    this.loading = true;
    this.makeApiRequest();
  }   

  @action setParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = this._formatData(entities.Data);
  }
}

export default Charts;