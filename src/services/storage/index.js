import LocalStorage from './localstorage';

class Storage {
    constructor() {
        this.store = new LocalStorage();
    }

    removeItem(key) {
        this.store.removeItem(key);
    }

    setItem(key, value, version) {
        var data = { data: value };
        if (version) {
            data.version = version;
        }
        data = JSON.stringify(data);
        this.store.setItem(key, data);
    }

    getItem(key, version) {
        var data = this.store.getItem(key);
        var item = null;
        var obj = null;

        if (data) {
            try {
                obj = JSON.parse(data);
            } catch(e) { }

            if (!version || obj && obj.version === version) {
                item = obj.data;
            }
        }

        return item;
    }
}

export { Storage };
