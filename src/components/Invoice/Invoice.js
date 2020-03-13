import React from 'react'
import InvoiceItem from './InvoiceItem'
import XButton from '../XButton/XButton'

class Invoice extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            items: [],
            discount: 0,
            customerPaid: 0
        }
    }

    render() {
        if (this.state.items.length === 0) {
            return this.renderNoItems()
        } else {
            return this.renderItems()
        }
    }

    reset() {
        this.setState({
            items: [],
            discount: 0,
            customerPaid: 0
        })
    }

    remove(index) {
        let arr = [...this.state.items]
        arr.splice(index, 1)

        this.setState({
            items: arr
        })
    }

    componentDidMount() {
        // Listen for, and handle, itemclicked event
        document.addEventListener('itemclicked', (e) => {
            const itemIndex = this.state.items.findIndex(item => e.itemData.id === item.id)
            console.log(itemIndex)
            if (itemIndex >= 0) {
                this.setState(({ items }) => ({
                    items: [
                        ...items.slice(0, itemIndex),
                        {
                            ...items[itemIndex],
                            quantity: items[itemIndex].quantity + 1
                        },
                        ...items.slice(itemIndex + 1)
                    ]
                }))
            } else {
                const newItem = e.itemData
                newItem.quantity = 1
                this.setState({ items: [...this.state.items, newItem] })
            }
        })

        // Listen for, and handle, barcode scan event
        document.addEventListener('barcode-scanned', (e) => {
            console.log(e)
        })
    }

    renderNoItems() {
        return (
            <div className="invoice">
                No items in invoice. Select any from items list to add to invoice.
            </div>
        )
    }

    renderItems() {
        let total = 0
        const items = this.state.items.map((item, index) => {
            total += (item.price * item.quantity)
            return <InvoiceItem key={item.id} id={item.id} name={item.name} price={item.price} quantity={item.quantity} removeHandler={() => this.remove(index)} />
        })

        return (
            <div className="invoice" onClick={this.props.clickHandler}>
                <table style={{ width: '100%', maxHeight: '200px', overflowY: 'scroll' }}>
                    <tbody>
                        {items}
                    </tbody>
                </table>

                <div className='summary'>
                    <div>
                        <p>Discount</p>
                        <p style={{ fontSize: '24px' }}>{this.state.discount}%</p>
                    </div>
                    <div>
                        <p>Total Amount</p>
                        <p style={{ fontSize: '24px' }}>${total}</p>
                    </div>
                    <div>
                        <p>Payable Amount</p>
                        <p style={{ fontSize: '24px' }}>${total - (total * this.state.discount)}</p>
                    </div>
                </div>

                <div>
                    <h4>Customer paid</h4>
                    <input type='number' defaultValue='0' min='0' onChange={(e) => this.setState({ customerPaid: e.target.value })} />
                </div>

                <div>
                    <p>Customer Balance</p>
                    <p style={{ fontSize: '24px' }}>${this.state.customerPaid - (total - (total * this.state.discount))}</p>
                </div>

                <div className='flex-container'>
                    <XButton text='Complete Transaction' />
                    <XButton text='Print' />
                    <XButton text='Clear' clickHandler={() => this.reset()} />
                </div>
            </div>
        )
    }
}

export default Invoice
