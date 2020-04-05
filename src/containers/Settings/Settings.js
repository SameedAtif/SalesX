import React from 'react'

import VideoDeviceSelector from '../../components/VideoDeviceSelector/VideoDeviceSelector'

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        return (
            <main>
                <section>
                    <h3>Barcode Scanning Configuration</h3>

                    <VideoDeviceSelector />
                </section>
            </main>
        )
    }
}

export default Settings