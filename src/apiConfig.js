const detailsApi = {
    domain 	: 'https://graphs2.coinmarketcap.com' 	,
    path 	:'/currencies/' 						,
    headers : {
        Accept 	: 'application/json' 				,
        headers : {
            'Content-Type' : 'application/json'
        }
    }
};

const api = {
    domain: 'https://api.coinmarketcap.com',
    path: '/v1/ticker/'
};



export {
    detailsApi,
    api
};