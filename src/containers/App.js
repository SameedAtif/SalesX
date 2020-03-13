import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
//import logo from '../logo.svg';
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import Settings from './Settings/Settings'
import StatusLight from '../components/StatusLight/StatusLight'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <Router>
                <div className='container'>
                    <header>
                        <Link to='/' className='btn'>Home</Link>
                        <Link to='/inventory' className='btn'>Inventory</Link>
                        <Link to='/settings' className='btn'>Settings</Link>
                    </header>
                    <Router>
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/settings' component={Settings} />
                    </Router>
                    <footer>
                        <StatusLight state='in-progress' label='syncing' tooltip='Transferring data' />
                        <StatusLight state='green' label='cloud connection' tooltip='Secure & Ready' />
                        <StatusLight state='green' label='disk state' tooltip='Good' />
                    </footer>
                </div>
            </Router>
        )
    }
}

export default App
