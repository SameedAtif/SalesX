import React from 'react'

class Product extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price
        }
    }

    itemClicked(id) {
        const event = document.createEvent("HTMLEvents")
        event.initEvent("itemclicked", true, true)
        event.eventName = "itemclicked"
        event.itemData = this.state
        document.dispatchEvent(event)
    }

    render() {
        return (
            <div onClick={() => this.itemClicked(this.state.id)}>
                {this.state.name} ${this.state.price}
            </div>
        )
    }
}

export default Product
