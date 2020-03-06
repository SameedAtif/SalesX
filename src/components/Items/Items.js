import React from 'react'
import axios from 'axios'
import Item from './Item/Item'

import './Items.css'

class Items extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: '',
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
        const items = this.state.items.filter(item => {
            if (item.name.toLowerCase().indexOf(this.state.filter) === -1)
                return false
            return true
        }).map(item => {
            return <Item key={item.id} id={item.id} name={item.name} price={item.price} />
        })

        return (
            <div className='items-list'>
                <input type='text' className='filter' onChange={e => this.updateFilter(e)} placeholder='Type here to filter items' />
                
                <table className='items-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
    }
}

export default Items
