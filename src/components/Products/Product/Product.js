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

    render() {
        return (
            <div>
                {this.state.name} ${this.state.price}
            </div>
        )
    }
}

export default Product
