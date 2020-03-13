import React from 'react'

import { BrowserQRCodeReader } from '@zxing/library'
import axios from 'axios';

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.codeReader = new BrowserQRCodeReader()

        this.state = {
            selectedDevice: 0,
            videoDevices: []
        }
    }

    componentWillMount() {
        this.updateVideoDevices()

        axios.get('http://localhost:3005/input-video-device')
            .then(response => {
                this.setState({ inputVideoDeviceId: response.data.inputVideoDeviceId })
            })
    }

    render() {
        const options = this.state.videoDevices.map(device => {
            return <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
        })
        return (
            <main>
                <h1>Settings page...</h1>
                <video
                    id="video"
                    width="300"
                    height="200"
                    style={{ border: '1px solid gray' }}
                ></video>

                <select onChange={(e) => { this.updateSelectedDevice(e.target.selectedIndex) }}>
                    {options}
                </select>
            </main>
        )
    }

    updateSelectedDevice(index) {
        this.setState({ selectedDevice: index })

        axios.post('http://localhost:3005/input-video-device', {
            'videoInputDevice': this.state.videoDevices[index].label
        }).then(response => {
            console.log(response)
        })
    }

    updateVideoDevices() {
        this.codeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
                this.setState({ videoDevices: videoInputDevices })
            })
            .catch(err => console.error(err))
    }

    sleep(ms) {
        const date = Date.now()
        let currentDate = null
        do {
            currentDate = Date.now()
        } while (currentDate - date < ms)
    }

    renderVideo() {
        this.codeReader
            .decodeOnceFromVideoDevice(this.state.videoDevices[this.state.selectedDevice].deviceId, 'video')
            .then(result => console.log(result.text))
            .catch(err => console.error('lmao', err))
    }

    componentWillUnmount() {
        this.codeReader.stopStreams()

        console.log('Unmounted Settings')
    }
}

export default Settings