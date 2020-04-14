import React from 'react'

import Main from '../../components/templates/Main'
import VideoDeviceSelector from '../../components/VideoDeviceSelector/VideoDeviceSelector'

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        return (
            <Main>
                <main>
                    <section>
                        <h3>Barcode Scanning Configuration</h3>

                        <VideoDeviceSelector />
                    </section>
                </main>
            </Main>
        )
    }
}

export default Settings