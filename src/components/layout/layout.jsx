import React, { Component } from 'react';

export default class Layout extends Component {
    render() {
        return (
            <div className="container-fluid">
                <header className="top-menu navbar navbar-default navbar-static-top">
                    <nav className="container" role="navigation">
                        <span className="navbar-brand">MY CPM</span>
                    </nav>
                </header>
                { this.props.children }
            </div>
        );
    }
}
