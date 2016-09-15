import React, { Component, PropTypes } from 'react';
import { Customer as CustomerModel } from '../models/customer';

export default class CustomerDetails extends Component {
    static displayName = 'CustomerDetails';
    static propTypes = {
        customer: PropTypes.instanceOf(CustomerModel).isRequired
    }

    render() {
        var { customer } = this.props;
        return (
            <div>
                <div className="col-xs-2 col-sm-3" style={ { marginBottom: '10px' } }>
                    <img alt={ customer.name } src={ customer.imageId } style={ { width: '100%', minWidth: '100px', padding: '0' }} />
                </div>
                <div className="col-xs-10 col-sm-9 panel">
                    <ul className="list-group">
                        <li className="list-group-item">Age: { customer.getAge() }</li>
                        <li className="list-group-item">Birth Day: { customer.getBirthdate() }</li>
                        <li className="list-group-item">Gender: { customer.gender }</li>
                    </ul>
                </div>
            </div>
        );
    }
}
