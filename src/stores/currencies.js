import {observable, computed} from 'mobx';
import {status, json} from '../helpers/utils';

/**
 * computed дикоратор который отробатывает каждый раз при изменении данных
 */
class Currencies{

    @observable loading = false
    @observable loaded = false

    @observable entities = {}

    loadAll(){
        fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
            .then(status)
            .then(json)
            .then(res => {
                console.log('---', res);
            })
            .catch(err => {
                console.log('----', err);
            });
    }
}

export default new Currencies;