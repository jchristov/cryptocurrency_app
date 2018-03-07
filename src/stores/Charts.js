import EntitiesStore from './EntitiesStore';
import { observable, action } from 'mobx';
import { detailsApi } from '../apiConfig';
import { getPriceHistoryUrl } from './utils';

class Charts extends EntitiesStore{

  @observable uid = null;

  constructor(...args){
    super(...args);
    this.detailsApi = detailsApi;
  }

  makeApiRequest(cryptocurrency, currency, api, timeLimit){
  const url = getPriceHistoryUrl(cryptocurrency, currency, api, timeLimit);

  super.makeApiRequest(uri)
    .then(this.setParams)
    .catch(err => console.error('load error component Charts', err));
  } 

  _formatData = (data) => (data.map(item => ({time: new Date(item.time * 1000), price: item.open})))
  
  @action loadCharts(cryptocurrency, currency, api, timeLimit){
    this.loading = true;
    this.makeApiRequest(cryptocurrency, currency, api, timeLimit);
  }   

  @action setParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = this._formatData(entities.Data);
  }
}

export default Charts;