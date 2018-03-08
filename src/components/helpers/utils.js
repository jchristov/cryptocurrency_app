import currencyFormatter from 'currency-formatter';

/**
 * Returns a formatted number with comma deliminated thousands.
 * 
 * @param 	{Number} number The number to format.
 * @returns {String} 		The formatted number.
 */
function numberFormat(number) {
  let parts;
  if (!number) return number;
  
  parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}

/**
 * Get image url
 * @param {String} coinName 
 */
function getImgUrl(coinName){
  return `https://files.coinmarketcap.com/static/img/coins_legacy/32x32/${coinName}.png`;
}

/**
 * Adds the appropriate symbol & separators to `value` based on the input `currencyCode`
 * @param {string} value
 * @param {string} currencyCode
 * @param {number} pre
 * @returns Formatted currency string
 */
function formatCurrency(value, currencyCode, precision = 1){
  return currencyFormatter.format(value, {
    code: currencyCode.toUpperCase(),
    precision
  });
}

export { 
  numberFormat, 
  getImgUrl,
  formatCurrency 
};