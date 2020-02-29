import React from 'react'
import axios from 'axios'
import Product from './Product/Product'

class Products extends React.Component {
    constructor(props) {
        super(props)

        console.log("Products created")
        this.state = {
            products: [
                { id: "11", name: "Dummy 1", price: "100" },
                { id: "22", name: "Dummy 2", price: "100" },
                { id: "33", name: "Dummy 3", price: "100" }
            ]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3005/items')
            .then(response => {
                console.log(response.data)

                this.setState({ products: response.data })
            })
    }

    render() {
        const products = this.state.products.map(product => {
            return <Product key={product.id} name={product.name} price={product.price} />
        })

        return (
            <div className='items-list'>
                {products}
            </div>
        )
    }
}

export default Products
