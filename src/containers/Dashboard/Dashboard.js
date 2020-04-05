import React from 'react'

import Items from '../../components/Items/Items'
import Invoice from '../../components/Invoice/Invoice'
import VideoScanner from '../../components/common/VideoScanner/VideoScanner'

import './Dashboard.css'

class Dashboard extends React.Component {

    render() {
        return (
            <main>
                <VideoScanner />
                <Items />
                <Invoice />
            </main>
        )
    }
}

export default Dashboard