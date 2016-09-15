export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export default function deleteCustomer(customerId) {
    return {
        type: DELETE_CUSTOMER,
        payload: { customerId }
    };
}

export function deleteCustomerError({ error }) {
    return {
        type: DELETE_CUSTOMER,
        payload: { error },
        error: true
    };
}
