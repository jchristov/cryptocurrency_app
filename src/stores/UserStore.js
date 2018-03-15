import BasicStore from './BasicStore';
import {observable, action} from 'mobx';
import firebase from 'firebase';

class UserStore extends BasicStore{
  @observable price = null;
  @observable course = null;
  @observable entities = null;
  
  constructor(...args){
    super(...args);
    this.key = null;
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

  @action addCryproCurrency = async(data) => {
    let updates = {};
    try {  
      const { key } = await firebase.database().ref('portfolio').push();
      updates[`/portfolio/${key}`] = data;
      return await firebase.database().ref().update(updates); 
    } catch (error) {
      console.log('error add currency to portfolio', error);
    }
  }

  fetchPortfolioList = () => {
    firebase.database().ref('portfolio').once('value')
      .then(snapshot => {
        const data = (snapshot.val() && snapshot.val()) || {};
        this.setEntities(data);
      })
      .catch(err => console.log(err));
  }

} 

export default UserStore;