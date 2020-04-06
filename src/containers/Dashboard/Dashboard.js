import React from 'react'

import Items from '../../components/Items/Items'
import Invoice from '../../components/Invoice/Invoice'

import './Dashboard.css'

class Dashboard extends React.Component {

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