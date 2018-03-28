import firebase from 'firebase';
import { status, json } from '../stores/utils';

(function(){
  const ref = firebase.database().ref(`/currency`);

  const uri = 'https://www.cryptocompare.com/api/data/coinlist/';
  fetch(uri)
    .then(status)
    .then(json)
    .then(response => {
      const data = Object.entries(response.Data).map(([key, value])=>{
        if(key === 'BTC'){
          console.log(value)
        }
        //ref.push(value);
      });

    });
})();