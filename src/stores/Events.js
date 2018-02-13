import {observable, computed, action, useStrict} from 'mobx';
import firebase from 'firebase';
import {status, json, entitiesFromFB} from './utils';
import EntitiesStore, {loadAllHelper} from './EntitiesStore';
//useStrict(true)

/**
 * computed - дикоратор который пересчитывается каждый раз при изменении данных
 * useStrict если мутации за пределами этого стора то об этом сообщат       
 */
export default class EventsStore extends EntitiesStore{
    @action loadAll = loadAllHelper('events');
}
