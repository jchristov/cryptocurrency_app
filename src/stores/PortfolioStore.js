import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {observable, action, computed} from 'mobx';
import firebase from 'firebase';
import { entitiesFromFB } from './utils';

class PortfolioStore extends EntitiesStore{
  @observable price = null;
  @observable course = null;
 
  setSelectedCurrency = (coinName) => {
    this.coinName = coinName;
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

  @computed get selectedCurrency(){
    const entities = this.list;
    return entities.filter(itm => (itm.coinName === this.coinName));
  }

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

  @action fetchPortfolioList = loadAllHelper('portfolio');

  @action loadCurrencyExchanges

} 

export default PortfolioStore;