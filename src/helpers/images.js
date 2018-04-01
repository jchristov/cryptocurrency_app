const api = {
    domain: 'https://files.coinmarketcap.com',
    icons: {
        small: '/static/img/coins_legacy/16x16/',
        medium: '/static/img/coins_legacy/32x32/',
        large: '/static/img/coins_legacy/64x64/'
    }
};

export default {
    currencies: {
        small_img(id) {
            return api.domain + api.icons.small + id + '.png';
        },
        medium_img(id) {
            return api.domain + api.icons.medium + id + '.png';
        },
        large_img(id) {
            return api.domain + api.icons.large + id + '.png';
        }
    }
}