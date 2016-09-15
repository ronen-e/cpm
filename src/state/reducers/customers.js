import { handleActions } from 'redux-actions';
import { Customer } from '../../models/customer';
import { Map as newMap } from 'immutable';
import { REQUEST_CUSTOMERS_FETCH, RESPONSE_CUSTOMERS_FETCH } from '../actions/fetch-customers';
import { ADD_CUSTOMER } from '../actions/add-customer';
import { DELETE_CUSTOMER } from '../actions/delete-customer';

const initialState = {
	map: newMap(),
	loading: false,
	nextId: 0
};

export default handleActions({
	[REQUEST_CUSTOMERS_FETCH]: (state, action) => {
		return {
			...state,
			loading: true
		};
	},
	[RESPONSE_CUSTOMERS_FETCH]: (state, { payload }) => {
		var { customers } = payload;
		return {
			...state,
			nextId: customers.length + 1,
			loading: false,
			map: addCustomers(state.map, customers)
		};
	},
	[ADD_CUSTOMER]: (state, { payload }) => {
		var { customer } = payload;
		customer.id = state.nextId;
		return {
			...state,
			nextId: state.nextId + 1,
			map: addCustomers(state.map, [ customer ])
		};
	},
	[DELETE_CUSTOMER]: (state, { payload }) => {
		var { customerId } = payload;
		var { map } = state;
		if (map.has(customerId)) {
			map = map.delete(customerId);
		}
		return {
			...state,
			map
		};
	}
}, initialState);

function addCustomers(customersMap, customers) {
	customers.forEach((customer) => {
		if (!customersMap.has(customer.id)) {
			customersMap = customersMap.set(customer.id, Customer.fromJSON(customer));
		}
	});
	return customersMap;
}
