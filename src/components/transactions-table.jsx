import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Transaction } from '../models/transaction';
import Radium, { Style } from 'radium';

@Radium
export default class TransactionsTable extends Component {
    static displayName = 'TransactionsTable';
    static propTypes = {
        items: ImmutablePropTypes.listOf(PropTypes.instanceOf(Transaction)).isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            sortBy: 'id'
        };
    }
    setSortKey(key) {
        this.setState({ sortBy: key });
    }

    render() {
        var { items } = this.props;
        items = items.sortBy((item) => item[this.state.sortBy]);    // TODO - cache results if key was not changed

        return (
            <div className="table-responsive transactions-table">
                <Style scopeSelector='.transactions-table' rules={{
                        th: {
                            fontWeight: 'normal'
                        }}
                    } />
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th onClick={() => this.setSortKey('id')}>ID</th>
                            <th onClick={() => this.setSortKey('purchaseDate')}>DATE</th>
                            <th onClick={() => this.setSortKey('itemId')}>Item ID</th>
                            <th onClick={() => this.setSortKey('name')}>Item Name</th>
                            <th onClick={() => this.setSortKey('price')}>Payment ($)</th>
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
