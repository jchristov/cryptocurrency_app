/**
 * Благодоря этому классу сторы знают о друг друге
 */
export default class BasicStore {
    constructor(stores) {
        this._stores = stores
    }

    getStore(name) {
        return this._stores[name]
    }
}