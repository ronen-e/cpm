import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import fetchCustomersAction from '../../state/actions/fetch-customers';
import classnames from 'classnames';

@connect(({ customers }) => {
    return { customers: customers.map.toList() };
}, (dispatch) => {
    return {
        fetchCustomers: () => dispatch(fetchCustomersAction())
    };
})
export default class Customers extends Component {
    static displayName = 'Customers';

    componentWillMount() {
        this.props.fetchCustomers();
    }

    getCustomersListComponent(customers) {
        const { params } = this.props;
        var customerId = Number(params.customerId);
        function linkClassName(id) {
            var className = classnames('list-group-item', {
                'active': id === customerId
            });
            return className;
        }

        return (
            <ul className="list-group">
                {customers.map(customer => (
                    <Link key={ customer.id } to={`/customers/${customer.id}`} className={ linkClassName(customer.id) }>
                        { customer.name }
                    </Link>
                ))}
            </ul>
        );
    }

    render() {
        const { customers } = this.props;

        var customersListComponent = null;
        if (customers.size > 0) {
            customersListComponent = this.getCustomersListComponent(customers);
        }

        return (
            <div className="row">
                <div className="master col-sm-4">
                    <Link to="/new-customer" className="btn btn-primary panel">Add Customer</Link><br />
                    { customersListComponent }
                </div>
                <div className="detail col-sm-8">
                    { this.props.children }
                </div>
            </div>
        );
    }
}
