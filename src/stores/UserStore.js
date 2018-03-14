import BasicStore from './BasicStore';
import {observable} from 'mobx';


class UserStore extends BasicStore{
  @observable price = null;
  constructor(...args){
    super(...args);
  }
} 

export default UserStore;