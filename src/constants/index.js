// Time duration constants
const DEFAULT_CURRENCY = 'USD'

const DURATION = {
  HOUR: { key: 'hour', codename: '1H', api: 'histominute', limit: 60, humanize: 'since an hour ago' },
  DAY: { key: 'day', codename: '1D', api: 'histominute', limit: 1440, humanize: 'since yesterday' },
  WEEK: { key: 'week', codename: '1W', api: 'histohour', limit: 168, humanize: 'since last week' },
  MONTH: { key: 'month', codename: '1M', api: 'histohour', limit: 672, humanize: 'since last month' },
  YEAR: { key: 'year', codename: '1Y', api: 'histoday', limit: 365, humanize: 'since last year' },
  ALL: { key: 'all', codename: 'ALL', api: 'histoday', limit: 2000, humanize: '' },
};


export {
  DURATION,
  DEFAULT_CURRENCY
};