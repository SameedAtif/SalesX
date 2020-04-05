import React from 'react'
import XButton from '../common/XButton/XButton';

class InvoiceItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price,
            quantity: props.quantity
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.quantity !== this.props.quantity) {
            this.setState({ quantity: this.props.quantity });
        }
    }

    render() {
        return (
            <tr>
                <td>{this.id}</td>
                <td>{this.state.name}</td>
                <td>{this.state.quantity}</td>
                <td>${this.state.price}</td>
                <td><XButton text='Remove' clickHandler={this.props.removeHandler} /></td>
            </tr>
        )
    }
}

export default InvoiceItem
