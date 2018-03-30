import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {observable, action, computed} from 'mobx';
import firebase from 'firebase';
import { getPriceMultiFullUri, entitiesFromFB, getCoinListUri, symbolListFromFb } from './utils';

class PortfolioStore extends EntitiesStore{
  @observable price = null;
  @observable course = null;
  
  setSelectedCurrency = (coinName) => {
    this.coinName = coinName;
  }
  
  makeApiRequest = (uri) => {
    return new Promise((resolve, reject) => {
      super.makeApiRequest(uri)
        .then(response => {
          const raw = response && response.RAW;
          const entities = Object.keys(raw).map(itm =>(Object.assign({key: itm}, raw[itm].USD)));
          this.setParams(entities);
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });    
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
      .then(async(data) => {
        const entities = entitiesFromFB(data.val()); 
        this.coin_list = Object.values(entities).map(item => (item.symbol));
        const str = this.coin_list.join(',');
        
        const uri = getPriceMultiFullUri(str)
        await this.makeApiRequest(uri);
        
        const detail = await Promise.all(this.coin_list.map(this.loadFbCurrencyDetail));
        console.log('---', detail);
      })
      .catch(err => console.log('Error load data from function loadPriceMultiFull', err));
  }  

  loadFbCurrencyDetail = symbol => {    
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref('currency');
      ref.orderByChild('Symbol').equalTo(symbol).on("child_added", (snapshot) => {
        snapshot ? resolve(snapshot) : reject(false);
      });
    });
  }

} 

export default PortfolioStore;