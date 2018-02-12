import {action, computed, observable} from 'mobx';
import firebase from 'firebase';
import EntitiesStore, {loadAllHelper} from './EntitiesStore';
import groupBy from 'lodash/groupBy';
import {decode} from 'base64-arraybuffer';

export default class PeopleStore extends EntitiesStore{
    @computed get sections() {
        const grouped = groupBy(this.list, person => person.firstName.charAt(0))

        return Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.uid, person}))
        }))
    }
    
    @action loadAll = loadAllHelper('people');

    @action updatePerson(uid, data){
        firebase.database().ref(`people/${uid}`).update(data);
    }
    
    @action async saveAvatar(uid, base64){
        const buf = decode(base64);
        const ref = firebase.storage().ref(`/avatars/${uid}.jpg`)

        ref.put(buf);

        const avatar = await ref.getDownloadURL();
        this.updatePerson(uid, {avatar});
    }
}