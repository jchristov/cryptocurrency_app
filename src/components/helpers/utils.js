/**
 * Returns a formatted number with comma deliminated thousands.
 * 
 * @param 	{Number} number The number to format.
 * @returns {String} 		The formatted number.
 */
function numberFormat(number) {
    let parts;

    if (!number) {

        return number;
    }
    parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export { numberFormat }