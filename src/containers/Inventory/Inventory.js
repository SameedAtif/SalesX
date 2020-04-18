import React from 'react'

import Main from '../../components/templates/Main'

import http from '../../services/httpService'

import './Inventory.css'

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: '',
            items: [],
            inventory: []
        }
    }

    componentDidMount() {
        this.getItemsAndInventory()
    }

    async getItemsAndInventory() {
        const items = await http.get('/items')
        const inventory = await http.get('/inventory')

        this.setState({
            items: items.data,
            inventory: inventory.data
        })
    }

    render() {
        const inventoryItems = this.state.items.filter(item => {
            if (item.name.toLowerCase().indexOf(this.state.filter) === -1)
                return false
            return true
        }).map((item, index) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.barcode}</td>
                    <td>{item.name}</td>
                    <td>{this.state.inventory[index].quantity}</td>
                </tr>
            )
        })

        return (
            <Main>
                <main>
                    <section className='inventory card depth-3'>
                        <input type='text' className='filter' onChange={e => this.updateFilter(e)} placeholder='Type here to filter items' />

                        <table className='items-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Barcode</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryItems}
                            </tbody>
                        </table>
                    </section>
                </main>
            </Main>
        )
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
    }
}

export default Settings