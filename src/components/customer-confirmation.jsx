import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

export default class CustomerConfirmation extends Component {
    static displayName = 'CustomerConfirmation';
    static propTypes = {
        onConfirm: PropTypes.func.isRequired
    };
    constructor() {
        super();

        this.state = {
            showConfirm: false
        };
    }

    render() {

        let confirmNode;

        if (this.state.showConfirm) {
            confirmNode = (
                <span>
                    <a href="" onClick={ this.confirmAction } className="btn btn-default">Yes </a>
                    <span> - or - </span>
                    <a href="" onClick={ this.toggleConfirmMessage } className="btn btn-default"> No</a>
                </span>
            )
        } else {
            confirmNode = (
                <a href="" onClick={ this.toggleConfirmMessage } className="btn btn-danger btn-xs">
                    {this.props.children}
                </a>
            );
        }

        var { onConfirm, ...props } = this.props;
        return (
            <div { ...props }>
                {confirmNode}
            </div>
        );
    }

    @autobind
    toggleConfirmMessage(e) {
        e.preventDefault();

        this.setState({ showConfirm: !this.state.showConfirm });

    }

    @autobind
    confirmAction(e) {
        e.preventDefault();
        this.props.onConfirm();

        // Returns to original state
        this.setState({ showConfirm: false });
    }
}
