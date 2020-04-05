import React from 'react'
import Item from './Item/Item'
import { BrowserBarcodeReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library'

import http from '../../services/httpService'

import './Items.css'

class Items extends React.Component {
    constructor(props) {
        super(props)

        this.codeReader = new BrowserBarcodeReader()
        this.codeReader.timeBetweenDecodingAttempts = 2000

        this.state = {
            filter: '',
            items: [
                { id: "11", name: "Dummy 1", price: "100" },
                { id: "22", name: "Dummy 2", price: "100" },
                { id: "33", name: "Dummy 3", price: "100" }
            ],
            videoInputDevice: null
        }

        this.setupVideoScanner()
    }

    async setupVideoScanner() {
        const { data } = await http.get('http://localhost:3005/input-video-device')

        this.setState({ videoInputDevice: data.videoInputDevice }, async () => {
            if (this.state.videoInputDevice !== null) {
                const videoInputDevices = await this.codeReader.listVideoInputDevices()

                if (!videoInputDevices) {

                    return
                }

                let savedDevice = videoInputDevices.find(device => device.label === this.state.videoInputDevice)
                if (!savedDevice)
                    savedDevice = videoInputDevices[0]

                this.startBarcodeScanning(savedDevice.deviceId)
            }
        })
    }

    async componentDidMount() {
        const { data: items } = await http.get('/items')
        this.setState({ items })
    }

    render() {
        const items = this.state.items.filter(item => {
            if (item.name.toLowerCase().indexOf(this.state.filter) === -1)
                return false
            return true
        }).map(item => {
            return <Item key={item.id} id={item.id} name={item.name} price={item.price} />
        })

        return (
            <section className='items-list'>
                <input type='text' className='filter' onChange={e => this.updateFilter(e)} placeholder='Type here to filter items' />

                <table className='items-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </section>
        )
    }

    updateFilter(event) {
        this.setState({
            filter: event.target.value
        })
    }

    componentWillUnmount() {
        this.codeReader.stopStreams()
    }

    barcodeScanned(code) {
        const event = document.createEvent("HTMLEvents")
        event.initEvent("barcode-scanned", true, true)
        event.eventName = "barcode-scanned"
        event.itemData = this.state.items.find(item => item.barcode === code)
        document.dispatchEvent(event)
    }

    startBarcodeScanning(deviceId) {
        console.log('starting to scan')
        this.codeReader
            .findDeviceById(deviceId)
            .then(device => {
                console.log(device)
                this.codeReader
                    .decodeFromInputVideoDeviceContinuously(device.deviceId, 'barcode-scanner', (result, err) => {
                        if (result) {
                            // properly decoded qr code 
                            console.log('Found QR code!', result.text)
                            //document.getElementById('result').textContent = result.text 
                            this.barcodeScanned(result.text)
                        }

                        if (err) {
                            // As long as this error belongs into one of the following categories 
                            // the code reader is going to continue as excepted. Any other error 
                            // will stop the decoding loop. 
                            // 
                            // Excepted Exceptions: 
                            // 
                            //  - NotFoundException 
                            //  - ChecksumException 
                            //  - FormatException 

                            if (err instanceof NotFoundException) {
                                //console.log('No QR code found.') 
                            }

                            if (err instanceof ChecksumException) {
                                console.log('A code was found, but it\'s read value was not valid.')
                            }

                            if (err instanceof FormatException) {
                                console.log('A code was found, but it was in a invalid format.')
                            }
                        }
                    })
            })
            .catch(err => {
                console.log('caught', err)
            })
    }
}

export default Items
