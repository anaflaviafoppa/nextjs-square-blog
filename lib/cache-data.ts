import {CacheDataModel} from '../components/models/cache-data';

export default class CacheData {
    private static timeouts = {};
    private static cache = {};
    constructor() {
    }

    static set({key, value, ttl}: CacheDataModel) {
        this.cache[key] = value;
        if (ttl) {
            if (this.timeouts[key]) {
                clearTimeout(this.timeouts[key]);
            }
            this.timeouts[key] = setTimeout(() => {
                delete this.cache[key];
            }, ttl);
        }
    }

    static get(key: string) {
        return this.cache[key];
    }
}
