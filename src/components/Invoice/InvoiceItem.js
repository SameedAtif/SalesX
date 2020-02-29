import React from 'react'

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

    // itemClicked(id) {
    //     const event = document.createEvent("HTMLEvents")
    //     event.initEvent("itemclicked", true, true)
    //     event.eventName = "itemclicked"
    //     event.itemData = this.state
    //     document.dispatchEvent(event)
    // }

    render() {
        return (
            <div /*onClick={() => this.itemClicked(this.state.id)}*/>
                {this.id} {this.state.name} {this.state.quantity} ${this.state.price}
            </div>
        )
    }
}

export default InvoiceItem
