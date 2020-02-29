import React from 'react'
import axios from 'axios'
import Item from './Item/Item'

class Items extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [
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

                this.setState({ items: response.data })
            })
    }

    render() {
        const items = this.state.items.map(item => {
            return <Item key={item.id} id={item.id} name={item.name} price={item.price} />
        })

        return (
            <div className='items-list'>
                {items}
            </div>
        )
    }
}

export default Items
