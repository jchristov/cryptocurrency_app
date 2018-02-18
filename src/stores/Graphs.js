import EntitiesStore from './EntitiesStore';
import { observable, action } from 'mobx';
import { detailsApi } from '../apiConfig';
import { setSchematic } from './utils';

export default class Graphs extends EntitiesStore{

    @observable id = null;
    constructor(...args){
        super(...args);
        this.detailsApi = detailsApi;
    }

    makeApiRequest(){
        const uri = this.detailsApi.domain + this.detailsApi.path +  
        super.makeApiRequest(uri)
            .then(data => {
                const normalised = setSchematic(data);
            })
            .catch(err => console.error('load error component Graphs', err));
    }

    @action loadGraphs(id){
        this.id = id;
        this.makeApiRequest();
    }

}
