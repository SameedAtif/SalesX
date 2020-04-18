import React from 'react'

import XButton from '../../components/common/xbutton/xbutton'

import http from '../../services/httpService'

import './Prelude.css'

const apiEndpoint = '/prelude'

// TODO: better move all this checking to 'splash.html'. Makes much more sense.
class Prelude extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            status: 'preparing to launch',
            statusCode: 'OK',
            dots: '.'
        }

        this.dotsIntervalRef = null

        this.stuffToPerform = [this.testEnvironment, this.testDbConnection, this.testTables]
    }

    testEnvironment = async () => {
        this.setState({ status: 'checking environment', statusCode: 'PENDING' })

        try {
            const { data } = await http.get(apiEndpoint + '/environment')

            if (data === 'OK') {
                this.setState({ status: 'environment OK', statusCode: 'OK' })
            }

            return data
        } catch ({ response }) {
            this.setState({ statusCode: 'FAIL' })
            return 'FAIL'
        }
    }

    testDbConnection = async () => {
        this.setState({ status: 'checking database connection', statusCode: 'PENDING' })

        try {
            const { data } = await http.get(apiEndpoint + '/database')

            if (data === 'OK') {
                this.setState({ status: 'database connection OK', statusCode: 'OK' })
            }

            return data
        } catch ({ response }) {
            this.setState({ status: 'Could not connect to database', statusCode: 'FAIL' })
            return 'FAIL'
        }
    }

    testTables = async () => {
        this.setState({ status: 'checking necessary tables', statusCode: 'PENDING' })

        try {
            const { data } = await http.get(apiEndpoint + '/setup-tables')

            if (data === 'OK') {
                this.setState({ status: 'necessary tables OK', statusCode: 'OK' })
            }

            return data
        } catch ({ response }) {
            this.setState({ status: 'Necessary tables could not be created', statusCode: 'FAIL' })
            return 'FAIL'
        }
    }

    async componentDidMount() {
        this.dotsIntervalRef = setInterval(() => {
            const dots = (this.state.dots === '...' ? '.' : this.state.dots + '.')
            this.setState({ dots })
        }, 1000)

        for (var i = 0; i < this.stuffToPerform.length; i++) {
            const result = await this.stuffToPerform[i]()
            if (result === 'FAIL')
                break
        }

        if (this.state.statusCode === 'OK')
            this.props.history.replace('dashboard')
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                height: '100vh'
            }}>
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                    <p className={`${this.state.statusCode === 'FAIL' ? 'fail' : ''}`}>{this.state.status}{this.state.dots}</p>
                    {this.state.statusCode === 'FAIL' ?
                        <div>
                            <h2>Please contact info@example.com or retry.</h2>
                            <XButton text='RETRY' clickHandler={e => {
                                window.location.reload()
                            }} />
                        </div> : ''}
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.dotsIntervalRef)
    }
}

export default Prelude