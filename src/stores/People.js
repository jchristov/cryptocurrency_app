import {action, computed, observable} from 'mobx';
import firebase from 'firebase';
import EntitiesStore, {loadAllHelper} from './EntitiesStore';

export default class PeopleStore extends EntitiesStore{
    @computed get sections() {
        const grouped = groupBy(this.list, person => person.firstName.charAt(0))

        return Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.uid, person}))
        }))
    }
    
    @action loadAll = loadAllHelper('people');
}