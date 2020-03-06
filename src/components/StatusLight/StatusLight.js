import React from 'react'

import './StatusLight.css'

const defaultToolTips = {
    'in-progress': 'Executing...',
    'green': 'Successfully completed'
}

function StatusLight(props) {
    return (
        <div className='status-light' title={props.tooltip || defaultToolTips[props.state]}>
            <span className={props.state}></span> {props.label}
        </div>
    )
}

export default StatusLight