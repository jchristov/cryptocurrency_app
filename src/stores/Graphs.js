import EntitiesStore from './EntitiesStore';
import { observable, action } from 'mobx';
import { detailsApi } from '../apiConfig';
import { setSchematic } from './utils';

export default class Graphs extends EntitiesStore{

    @observable uid = null;
    
    constructor(...args){
        super(...args);
        this.detailsApi = detailsApi;
    }

    makeApiRequest(){
        const uri = this.detailsApi.domain + this.detailsApi.path + this.uid;  
        super.makeApiRequest(uri)
            .then(this.setParams)
            .catch(err => console.error('load error component Graphs', err));
    }

    @action loadGraphs(uid){
        this.uid = uid;
        this.loading = true;
        this.makeApiRequest();
    }   

    @action setParams = (entities) => {
        entities = setSchematic(entities);
        this.loading = false;
        this.loaded = true;
        this.entities = entities;
    }
}
