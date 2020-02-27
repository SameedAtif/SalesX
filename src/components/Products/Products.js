import React from 'react'
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

        var xhr = new XMLHttpRequest()

        xhr.onreadystatechange = (e) => {
            const response = e.target
            if (response.readyState === 4 && response.status === 200) {

                let newProducts = JSON.parse(xhr.responseText).map(product => {
                    return product
                })

                this.setState({ products: newProducts })
            }
        }

        xhr.open('GET', 'http://localhost:3005/items')
        xhr.send()
    }

    componentDidUpdate() {
        console.log("Products updated")
        console.log(this.state)
    }

    render() {
        console.log("Products rendering")
        //console.log(this.state)
        return (
            <div>
                {this.state.products.map(product => {
                    console.log(product.id)
                    return <Product key={product.id} id={product.id} name={product.name} price={product.price} />
                })}
            </div>
        )
    }
}

export default Products
