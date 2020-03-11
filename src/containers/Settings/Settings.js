import React from 'react'

import { BrowserQRCodeReader } from '@zxing/library'

class Settings extends React.Component {
    codeReader = new BrowserQRCodeReader();

    constructor(props) {
        super(props)

        this.state = {
            selectedDevice: 0,
            videoDevices: []
        }
    }

    render() {
        const options = this.state.videoDevices.map(device => {
            return <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
        })
        return (
            <div>
                <h1>Settings page...</h1>
                <video
                    id="video"
                    width="300"
                    height="200"
                    style={{ border: '1px solid gray' }}
                ></video>

                <select onChange={(e) => { console.log(e); this.setState({ selectedDevice: e.target.selectedIndex }) }}>
                    {options}
                </select>
            </div>
        )
    }

    componentDidMount() {
        this.updateVideoDevices()
    }

    updateVideoDevices() {
        this.codeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
                let devices = []
                videoInputDevices.forEach(device =>
                    devices.push(device)
                )

                this.setState({ videoDevices: devices }, this.renderVideo)
            })
            .catch(err => console.error(err))
    }

    renderVideo() {
        this.codeReader
            .decodeOnceFromVideoDevice(this.state.videoDevices[this.state.selectedDevice].deviceId, 'video')
            .then(result => console.log(result.text))
            .catch(err => console.error(err))
    }

    // TODO: Stop playing the god damn video before unmounting
    componentWillUnmount() {
        //this.codeReader.
        console.log('Unmounting Settings')
    }
}

export default Settings