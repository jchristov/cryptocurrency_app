import EntitiesStore, { loadAllHelper } from './EntitiesStore';
import {observable, action, computed} from 'mobx';
import firebase from 'firebase';
import { entitiesFromFB, getCoinListUri, symbolListFromFb } from './utils';

class PortfolioStore extends EntitiesStore{
  @observable price = null;
  @observable course = null;
  @observable coinList = null;
  
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

  @action setCoinList = (coinList) => {   
    this.coinList = coinList;
  }

  @action setParams = (response) => {
    const raw = response.RAW;
    this.loading = false;
    this.loaded = true;
    this.entities = Object.keys(raw).map(itm => (Object.assign({key: itm}, raw[itm].USD)));
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

  @action loadPriceMultiFull = () => {
    this.loading = true;

    firebase.database().ref('portfolio').once('value', data => {
        const entities = entitiesFromFB(data.val()); 
        const str = Object.values(entities).map(item => (item.symbol)).join(',');
        const uri = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${str}&tsyms=USD`;
        this.makeApiRequest(uri)
      }).catch(err => console.log('Error load data from function loadPriceMultiFull', err));
  }  

  makeApiRequest = (uri) => super.makeApiRequest(uri).then(this.setParams);

  loadCoinList = () => {
    const uri = getCoinListUri();
    
    super.makeApiRequest(uri)
      .then(this.setCoinList)
      .catch(err => console.log('--err--'));
  } 


} 

export default PortfolioStore;