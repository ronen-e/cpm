import React, { Component } from 'react';
import { browserHistory, Router, Route, Redirect } from 'react-router';

// Layout
import Layout from './layout/layout';

// Pages
import NewCustomerPage from './pages/new-customer';
import CustomersPage from './pages/customers';
import Customer from './customer';

export default class App extends Component {
    render() {
        return (
            <Router history={ browserHistory }>
                <Redirect from="/" to="/customers" />
                <Route path="/" component={ Layout }>
                    <Route path="customers" component={ CustomersPage }>
                        <Route path=":customerId" component={ Customer }/>
                    </Route>
                    <Route path="new-customer" component={ NewCustomerPage } />
                </Route>
            </Router>
        );
    }
}
