var isSupported = (function() {
    try {
        var test = 'test';
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }

        window.localStorage.setItem(test, test);
        window.localStorage.getItem(test);
        window.localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

class LocalStorage {
    getItem(key) {
        var value = null;
        if (isSupported) {
            value = window.localStorage.getItem(key);
        }
        return value;
    }

    setItem(key, value) {
        if (isSupported) {
            window.localStorage.setItem(key, value);
        }
    }

    removeItem(key) {
        if (isSupported) {
            window.localStorage.removeItem(key);
        }
    }
}

export default LocalStorage;
