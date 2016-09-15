export const ADD_CUSTOMER = 'ADD_CUSTOMER';

export default function addCustomer(customer) {
    return function(dispatch, getState) {
        dispatch({
            type: ADD_CUSTOMER,
            payload: { customer }
        });
    };
}

export function addCustomerError({ error }) {
    return {
        type: ADD_CUSTOMER,
        payload: { error },
        error: true
    };
}
