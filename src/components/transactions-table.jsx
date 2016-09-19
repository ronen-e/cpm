import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Transaction } from '../models/transaction';
import { Style } from 'radium';

export default class TransactionsTable extends Component {
    static displayName = 'TransactionsTable';
    static propTypes = {
        items: ImmutablePropTypes.listOf(PropTypes.instanceOf(Transaction)).isRequired
    }

    constructor(props) {
        super(props);

        this.state = { sortKey: 'id' };
    }
    sortBy(sortKey) {
        this.setState({ sortKey });
    }

    render() {
        var { items } = this.props;
        var tableStyle = (
            <Style scopeSelector='.transactions-table' rules={{
                    th: { fontWeight: 'normal' }
                }} />
        );
        items = items.sortBy((item) => item[this.state.sortBy]);    // TODO - cache results if key was not changed

        return (
            <div className="table-responsive transactions-table">
                { tableStyle }
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortBy('id')}>ID</th>
                            <th onClick={() => this.sortBy('purchaseDate')}>DATE</th>
                            <th onClick={() => this.sortBy('itemId')}>Item ID</th>
                            <th onClick={() => this.sortBy('name')}>Item Name</th>
                            <th onClick={() => this.sortBy('price')}>Payment ($)</th>
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
