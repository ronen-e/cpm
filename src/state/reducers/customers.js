import { handleActions } from 'redux-actions';
import { Customer } from '../../models/customer';
import { Map as newMap } from 'immutable';
import { REQUEST_CUSTOMERS_FETCH, RESPONSE_CUSTOMERS_FETCH } from '../actions/fetch-customers';
import { ADD_CUSTOMER } from '../actions/add-customer';
import { DELETE_CUSTOMER } from '../actions/delete-customer';
import { CUSTOMERS_STORAGE_KEY } from '../../services/constants';
import storage from '../../services/app-storage';

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

		storage.setItem(CUSTOMERS_STORAGE_KEY, payload);
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

		// add to local storage
		var storageItem = storage.getItem(CUSTOMERS_STORAGE_KEY);
		if (storageItem && storageItem.customers) {
			var customers = getCustomersJSON(state.map);
			customers.push(customer);
			storageItem.customers = customers;
			storage.setItem(CUSTOMERS_STORAGE_KEY, storageItem);
		}

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

			var storageItem = storage.getItem(CUSTOMERS_STORAGE_KEY);
			if (storageItem) {
				storageItem.customers = getCustomersJSON(map);
				storage.setItem(CUSTOMERS_STORAGE_KEY, storageItem);
			}
		}
		return {
			...state,
			map
		};
	}
}, initialState);

function getCustomersJSON(customersMap) {
	return customersMap.toArray().map(c => c.toJSON());
}

function addCustomers(customersMap, customers) {
	customers.forEach((customer) => {
		if (!customersMap.has(customer.id)) {
			customersMap = customersMap.set(customer.id, Customer.fromJSON(customer));
		}
	});
	return customersMap;
}
