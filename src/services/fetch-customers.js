import superagent from 'superagent';

function fetchCustomers() {
    return new Promise((resolve, reject) => {
        superagent.get('/api/customers/customers.json')
        .set('Accept', 'application/json')
        .end( function(err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response.body.data);
            }
        });
    });
}

export default fetchCustomers;
