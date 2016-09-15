import fetch from '../../services/fetch-customers';

export const REQUEST_CUSTOMERS_FETCH = 'REQUEST_CUSTOMERS_FETCH';
export const RESPONSE_CUSTOMERS_FETCH = 'RESPONSE_CUSTOMERS_FETCH';

export default function fetchCustomers() {
    return async function(dispatch, getState) {
        dispatch({
            type: REQUEST_CUSTOMERS_FETCH,
            payload: { }
        });
        try {
            let data = await fetch();
            dispatch({
                type: RESPONSE_CUSTOMERS_FETCH,
                payload: { ...data }
            });
        } catch (error) {
            // dispatch({
            //     type: RESPONSE_CUSTOMERS_FETCH,
            //     payload: { error },
            //     error: true
            // });
        }
    };
}
