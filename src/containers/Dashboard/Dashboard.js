import React from 'react'
import Items from '../../components/Items/Items'
import Invoice from '../../components/Invoice/Invoice'

import { BrowserQRCodeReader } from '@zxing/library'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <main>
                <Items />

                <Invoice />
            </main>
        )
    }
}

export default Dashboard