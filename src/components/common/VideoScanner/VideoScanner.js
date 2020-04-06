import React from 'react'
import { BrowserBarcodeReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library'

import http from '../../../services/httpService'
import notificationService from '../../../services/notificationService'

class VideoScanner extends React.Component {
    constructor(props) {
        super(props)

        this.codeReader = new BrowserBarcodeReader()
        this.codeReader.timeBetweenDecodingAttempts = 2000

        this.state = {
            videoInputDevice: null
        }

        this.setupVideoScanner()
    }

    componentDidMount() {
        this.dragElement(document.getElementById('barcode-scanner'))
    }

    async setupVideoScanner() {
        const videoInputDevices = await this.codeReader.listVideoInputDevices()
        if (!videoInputDevices) {
            notificationService.alertWarning('No video input device found!')
            // TODO hide video element
            return
        }

        const { data } = await http.get('http://localhost:3005/input-video-device')
        this.setState({ videoInputDevice: data.videoInputDevice }, async () => {
            if (this.state.videoInputDevice !== null) {
                let savedDevice = videoInputDevices.find(device => device.label === this.state.videoInputDevice)
                if (!savedDevice) {
                    notificationService.alertInfo('Could not find saved device. Using default video input device!')
                    savedDevice = videoInputDevices[0]
                }

                this.startBarcodeScanning(savedDevice.deviceId)
            } else {
                notificationService.alertInfo('Saved device is null. Using default video input device!')
                this.startBarcodeScanning(videoInputDevices[0].deviceId)
            }
        })
    }

    render() {
        return (
            <video
                id='barcode-scanner'
                width="300"
                height="200"
                style={{ border: '1px solid gray', position: 'absolute', cursor: 'move' }}></video>
        )
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

    async startBarcodeScanning(deviceId) {
        console.log('starting to scan')

        try {
            const device = await this.codeReader.findDeviceById(deviceId)

            this.codeReader.decodeFromInputVideoDeviceContinuously(device.deviceId, 'barcode-scanner', (result, err) => {
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
        } catch (ex) {
            console.log('caught', ex)
        }
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

export default VideoScanner