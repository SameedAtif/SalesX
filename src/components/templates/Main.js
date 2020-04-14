import React from 'react'
import { NavLink } from 'react-router-dom'

import XButton from '../common/XButton/XButton'
import StatusLight from '../common/StatusLight/StatusLight'

import authService from '../../services/authService'

const Main = props => {
    const currentEmployee = authService.getCurrentUser()
    return (
        <div className='container'>
            <header>
                <XButton text={`${currentEmployee.firstName} ${currentEmployee.lastName}`} />
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