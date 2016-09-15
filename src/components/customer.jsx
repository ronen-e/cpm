import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import navigateTo from '../services/navigate-to';
import deleteCustomerAction from '../state/actions/delete-customer';
import CustomerConfirmation from './customer-confirmation';
import TransactionsTable from './transactions-table';
import CustomerDetails from './customer-details';
import { Customer as CustomerModel } from '../models/customer';

@connect(({ customers }) => {
    return { customers: customers.map };
}, (dispatch) => {
    return {
        onDelete: (customerId) => dispatch(deleteCustomerAction(customerId))
    };
})
export default class Customer extends Component {
    static displayName = 'Customer';
    static propTypes = {
        customers: ImmutablePropTypes.mapOf(PropTypes.instanceOf(CustomerModel)).isRequired,
        params: PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customers !== this.props.customers) {
            navigateTo('/customers');
        }
    }

    getCustomer() {
        var { customers, params } = this.props;
        var customer = customers.get(Number(params.customerId));
        return customer;
    }

    render() {
        var customer = this.getCustomer();

        if (!customer) {
            return null;
        }

        var transactions = customer.transactions;
        var transactionsComponent = null;
        if (transactions.size > 0) {
            transactionsComponent = <TransactionsTable items={ transactions } />;
        }

        return (
            <div>
                <div className="well well-md">
                    <span className="col-sm-6">{ `${customer.id}: ${customer.name}` }</span>
                    <CustomerConfirmation className="col-sm-6 pull-right text-right"
                        onConfirm={() => this.props.onDelete(customer.id) }>
                        Delete customer?
                    </CustomerConfirmation>
                </div>
                <div className="row">
                    <CustomerDetails customer={ customer } />
                </div>
                <div className="row">
                    { transactionsComponent }
                </div>
            </div>
        );
    }
}
