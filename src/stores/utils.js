function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
  
function json(response) {
  return response.json()
}
  
function entitiesFromFB(data) {
  Object.entries(data).forEach(([key, value]) => value.uid = key)
  return data
}
  
function entitiesFromHistoApi(data) {
  return data.map(item => (
    {
      time: new Date(item.time * 1000), 
      price: item.open,
      close: item.close,
      high: item.high,
      low: item.low,
    }
  ));
}

function setSchematic(data) {
  return {
    market : {
      cap 	: data['market_cap_by_available_supply'] ,
      volume 	: data['volume_usd']
    },

    prices : {
      btc : data['price_btc'],
      usd : data['price_usd']
    }
  };
}

function getHistoUrl(cryptocurrency = 'BTC', currency = 'USD', api, timeLimit){
  return `https://min-api.cryptocompare.com/data/${api}?fsym=${cryptocurrency}&tsym=${currency}&limit=${timeLimit}&aggregate=1&e=CCCAGG`;
}

function getPriceHistoricalUrl(cryptocurrency = 'BTC', currency = 'USD', time) {
  return `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${cryptocurrency}&tsyms=${currency}&ts=${time}`;
}

function  getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getTime();
}

export {
  status, 
  setSchematic, 
  entitiesFromFB, 
  json,
  getHistoUrl,
  getPriceHistoricalUrl,
  getDateAgo,
  entitiesFromHistoApi
};