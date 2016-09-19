import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Transaction } from '../models/transaction';
import { Style } from 'radium';

const ASC = 'ASC';
const DESC = 'DESC';

export default class TransactionsTable extends Component {
    static displayName = 'TransactionsTable';
    static propTypes = {
        items: ImmutablePropTypes.listOf(PropTypes.instanceOf(Transaction)).isRequired
    }

    constructor(props) {
        super(props);

        this.state = { sortKey: 'id', direction: ASC };
    }
    sortBy(sortKey, direction = ASC) {
        if (sortKey === this.state.sortKey && this.state.direction === ASC) {
            direction = DESC;
        }
        this.setState({ sortKey, direction });
    }

    comparator(a, b, direction) {
        var result;
        switch (typeof a) {
            case 'number':
                result = a - b;
                break;
            case 'string':
                result = a.localeCompare(b);
                break;
        }

        if (direction === DESC) {
            result = -(result);
        }
        return result;
    }

    render() {
        var { items } = this.props;
        var { sortKey, direction } = this.state;

        var tableStyle = (
            <Style scopeSelector=".transactions-table" rules={{
                    th: { fontWeight: 'normal' }
                }} />
        );

        items = items.sortBy(
            (item) => item[sortKey],
            (a, b) => this.comparator(a, b, direction)
        );

        return (
            <div className="table-responsive transactions-table">
                { tableStyle }
                <table className="table table-condensed table-striped">
                    <thead>
                        <tr>
                            <th onClick={ () => this.sortBy('id') }>ID</th>
                            <th onClick={ () => this.sortBy('purchaseDate') }>DATE</th>
                            <th onClick={ () => this.sortBy('itemId') }>Item ID</th>
                            <th onClick={ () => this.sortBy('name') }>Item Name</th>
                            <th onClick={ () => this.sortBy('price') }>Payment ($)</th>
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
