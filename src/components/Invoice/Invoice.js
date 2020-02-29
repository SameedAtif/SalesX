import React from 'react'
import Product from '../Products/Product/Product'

class Invoice extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            items: []
        }
    }

    render() {
        let total = 0
        const items = this.state.items.map(item => {
            total += item.price
            return <Product key={item.id} name={item.name} price={item.price} />
        })

        return (
            <div className="invoice" onClick={this.props.clickHandler}>
                {items}

                <div>
                    <h4>Total: {total}</h4>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('itemclicked', (e) => {
            this.setState({items: [...this.state.items, e.itemData]})
        })
    }
}

export default Invoice
