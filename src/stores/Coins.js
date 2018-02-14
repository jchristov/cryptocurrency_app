import EntitiesStore, {loadApi} from './EntitiesStore';
import {observable, computed, action} from 'mobx';

export default class CoinsStore extends EntitiesStore{
    @action loadApi = loadApi();
}