import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Transaction } from '../models/transaction';

export default class TransactionsTable extends Component {
    static displayName = 'TransactionsTable';
    static propTypes = {
        items: ImmutablePropTypes.listOf(PropTypes.instanceOf(Transaction)).isRequired
    }

    render() {
        var { items } = this.props;
        return (
            <div className="table-responsive">
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>DATE</td>
                            <td>Item ID</td>
                            <td>Item Name</td>
                            <td>Payment ($)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(transaction => (
                            <tr key={ transaction.id }>
                                <td>{ transaction.id }</td>
                                <td>{ transaction.getPurchaseDate().toDateString() }</td>
                                <td>{ transaction.itemId }</td>
                                <td>{ transaction.name }</td>
                                <td>{ transaction.price }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
