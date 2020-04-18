import React from 'react'

import Main from '../../components/templates/Main'
import Items from '../../components/Items/Items'
import Invoice from '../../components/Invoice/Invoice'

import './Dashboard.css'

class Dashboard extends React.Component {

    render() {
        return (
            <Main>
                <main>
                    <Items />
                    <Invoice />
                </main>
            </Main>
        )
    }
}

export default Dashboard