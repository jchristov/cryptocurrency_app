import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {observable, action, computed} from 'mobx';
import firebase from 'firebase';
import { entitiesFromFB, getCoinListUri, symbolListFromFb } from './utils';

class PortfolioStore extends EntitiesStore{
  @observable price = null;
  @observable course = null;
  
  setSelectedCurrency = (coinName) => {
    this.coinName = coinName;
  }
  
  makeApiRequest = async(uri) => {
    try {   
      const response = await super.makeApiRequest(uri)
      
      const raw = response && response.RAW;
      const entities = Object.keys(raw).map(itm =>{
        const symbol = raw[itm].USD.Symbol;
        
        return Object.assign({key: itm}, raw[itm].USD);

      });

      this.setParams(entities);
    } catch (_) {}
  }

  @action setCourse = (course) => {
    this.course = course;
  }

  @action setPrice = (price) => {
    this.price = price;
  }

  @action setEntities = (entities) => {
    this.entities = entities;
  }

  @action setParams = (entities) => {
    this.loading = false;
    this.loaded = true;
    this.entities = entities;
  }

  @computed get selectedCurrency(){
    const entities = this.list;
    return entities.filter(itm => (itm.coinName === this.coinName));
  }

  /**
   * Подписаться на валюту
   * {Object} data
   */
  @action subscribeCurrency = async(data) => {
    let updates = {};
    try {  
      const { key } = await firebase.database().ref('portfolio').push();
      updates[`/portfolio/${key}`] = data;
      return await firebase.database().ref().update(updates); 
    } catch (error) {
      console.log('error add currency to portfolio', error);
    }
  }

  /**
   * Api https://min-api.cryptocompare.com/
   * Загружаем инфу по валютам на которую мы подписаны
   */
  @action loadPriceMultiFull = () => {
    this.loading = true;

    firebase.database().ref('portfolio').once('value')
      .then(data => {
        const entities = entitiesFromFB(data.val()); 
        this.coin_list = Object.values(entities).map(item => (item.symbol));
        const str = this.coin_list.join(',');
        
        const uri = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${str}&tsyms=USD`;
        this.makeApiRequest(uri);
      })
      .catch(err => console.log('Error load data from function loadPriceMultiFull', err));
  }  

  loadFbCurrencyDetail = symbol => {
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref('currency');
      ref.orderByChild('Symbol').equalTo(symbol).on("child_added")
      .then(snapshot => {
        resolve(snapshot);
      }).catch(err => reject(err));
    });
  }

} 

export default PortfolioStore;