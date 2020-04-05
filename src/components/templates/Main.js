import React from 'react'
import { NavLink } from 'react-router-dom'

import StatusLight from '../common/StatusLight/StatusLight'

const Main = props => {
    return (
        <div className='container'>
            <header>
                <NavLink to='/dashboard' className='btn'>Dashboard</NavLink>
                <NavLink to='/inventory' className='btn'>Inventory</NavLink>
                <NavLink to='/settings' className='btn'>Settings</NavLink>
            </header>

            {props.children}

            <footer>
                <StatusLight state='in-progress' label='syncing' tooltip='Transferring data' />
                <StatusLight state='green' label='cloud connection' tooltip='Secure & Ready' />
                <StatusLight state='green' label='disk state' tooltip='Good' />
            </footer>
        </div>
    )
}

export default Main