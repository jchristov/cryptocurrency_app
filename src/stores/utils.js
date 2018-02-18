export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
  
export function json(response) {
  return response.json()
}
  
export function entitiesFromFB(data) {
  Object.entries(data).forEach(([key, value]) => value.uid = key)
  return data
}
  
export function setSchematic(data) {
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
