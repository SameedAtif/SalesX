import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Main from '../components/templates/Main'

import Prelude from './Prelude/Prelude'
import Dashboard from './Dashboard/Dashboard'
import Inventory from './Inventory/Inventory'
import Settings from './Settings/Settings'

import './App.css'
//import logo from '../logo.svg'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact component={Prelude} />
                    <Main>
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/inventory' component={Inventory} />
                        <Route path='/settings' component={Settings} />
                    </Main>
                </Switch>
            </Router>
        )
    }
}

export default App
