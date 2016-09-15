import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import addCustomerAction from '../../state/actions/add-customer';
import navigateTo from '../../services/navigate-to';


@connect(
    ({ customers }) => {
        return { customers: customers.map };
    },
    (dispatch) => {
        return {
            onAddCustomer: (customer) => dispatch(addCustomerAction(customer))
        };
    }
)
export default class NewCustomerPage extends Component {
    static displayName = 'NewCustomerPage'
    constructor() {
        super();
        this.state = {
            gender: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customers !== this.props.customers) {
            navigateTo('/customers');
        }
    }

    @autobind
    onChange(event) {
        const value = event.target.value;
        const key = event.target.name;

        this.setState({ [key]: value });
    }

    render() {
        return (
            <form ref="form" className="customer-form new-customer-form" onSubmit={ this.handleSubmit }>
                <label>New Customer</label>
                <div className="customer-form-fields">
                    <div className="form-group">
                        <input placeholder="Name:" ref="name" name="name" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Age:" ref="age" name="age" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Image Url:" ref="imageId" name="imageId" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="radio-inline"><input type="radio" name="gender" value="male" onChange={ this.onChange } /> Male</label>
                        <label className="radio-inline"><input type="radio" name="gender" value="female" onChange={ this.onChange } /> Female</label>
                    </div>

                </div>
                <div className="customer-form-actions">
                    <button type="submit" className="btn">
                        Create Customer
                    </button>
                </div>
            </form>
        );
    }

    @autobind
    handleSubmit(event) {
        event.preventDefault();
        var name = this.refs.name.value;
        var age = Number(this.refs.age.value);
        var imageId = this.refs.imageId.value;
        var { gender } = this.state;

        this.props.onAddCustomer({ name, age, imageId, gender });
        this.refs.form.reset();
    }
}
