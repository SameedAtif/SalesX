import React from 'react'
import XButton from '../../XButton/XButton'

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            name: props.name,
            price: props.price,
            barcode: props.barcode
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
            <tr className='item' title='Click to add to invoice'>
                <td>{this.state.name}</td>
                <td>{this.state.price}</td>
                <td>-1</td>
                <td><XButton text='Add' clickHandler={() => this.itemClicked(this.state.id)} /></td>
            </tr>
        )
    }
}

export default Item
