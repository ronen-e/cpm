import superagent from 'superagent';
import storage from './app-storage';
import { CUSTOMERS_STORAGE_KEY, API_CUSTOMERS_FETCH } from './constants';

function fetchCustomers() {
    return new Promise((resolve, reject) => {
        var data = storage.getItem(CUSTOMERS_STORAGE_KEY);
        if (data) {
            resolve(data);
        } else {
            sendRequest(function(err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.body.data);
                }
            });
        }
    });
}

function sendRequest(callback) {
    superagent.get(API_CUSTOMERS_FETCH)
    .set('Accept', 'application/json')
    .end(callback);
}

export default fetchCustomers;
