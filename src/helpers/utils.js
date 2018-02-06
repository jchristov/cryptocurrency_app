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
  console.log('123', data)
  Object.entries(data).forEach(([key, value]) => value.uid = key)
  return data
}
