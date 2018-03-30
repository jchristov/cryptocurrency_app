import EntitiesStore from './EntitiesStore';
import { observable, action } from 'mobx';
import { detailsApi } from '../apiConfig';
import { getHistoUrl, getPriceHistoricalUrl, getDateAgo, entitiesFromHistoApi } from './utils';
import { DURATION } from '../constants';

const DURATION_LIST = Object.keys(DURATION).map(item => DURATION[item]); 

class Charts extends EntitiesStore{

  @observable uid = null;
  @observable selectedDurationIndex = 0;
  @observable historicalPrice = null;

  constructor(...args){
    super(...args);  
    this.detailsApi = detailsApi;
    this.dayAgo = 365;
    this.date = new Date();
    this.uri = '';
  }

  makeApiRequest = async() => {
    try {
      const response = await super.makeApiRequest(this.uri);
      this.setHistoParams(response); 
    } catch (err) {
      console.error('load error component Charts', err)
    }
  } 
  
  @action loadCharts(cryptocurrency, currency, api = 'histoday', timeLimit = '2000'){
    this.uri = getHistoUrl(cryptocurrency, currency, api, timeLimit);
    this.loading = true;
    this.makeApiRequest();
  }   
  
  @action setHistoParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = entitiesFromHistoApi(entities.Data);
  }
  
  @action setDurationIndex = (index) => {
    this.selectedDurationIndex = index;
  }

  /**
   * !Deprecated
   */
  loadPriceHistorical(cryptocurrency, currency){
    const milliseconds = getDateAgo(this.date, this.dayAgo);
    const seconds = Math.round(milliseconds / 1000);

    const uri = getPriceHistoricalUrl(cryptocurrency, currency, seconds);    
    super.makeApiRequest(uri)
      .then(this.setPriceHistoricalParams)
      .catch(err => console.log('Error load PriceHistorical Data', err))
  }

  /**
   * !Deprecated
   */
  @action setPriceHistoricalParams = (price) => {
    const data = Object.keys(price).map(item => price[item]);
    this.historicalPrice = data;
  }

}

export default Charts;