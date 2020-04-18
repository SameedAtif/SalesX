import React from 'react'

import authService from '../../services/authService'

import Main from '../../components/templates/Main'
import VideoDeviceSelector from '../../components/VideoDeviceSelector/VideoDeviceSelector'
import XButton from '../../components/common/xbutton/xbutton'

import './Settings.css'

class Settings extends React.Component {

    logout() {
        authService.logout()
        window.location = '/#/dashboard'
    }

    render() {
        const currEmployee = authService.getCurrentUser()

        return (
            <Main>
                <main>
                    <section class='card depth-3 video-selector'>
                        <h3>Barcode Scanning Configuration</h3>

                        <VideoDeviceSelector />
                    </section>

                    <section class='card depth-3 employee-account'>
                        <h3>Logged in as</h3>

                        <div>
                            <h2>{currEmployee.firstName} {currEmployee.lastName}</h2>
                            <XButton text='Logout' clickHandler={this.logout} />
                        </div>
                    </section>
                </main>
            </Main>
        )
    }
}

export default Settings