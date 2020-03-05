import React from 'react'

import './StatusLight.css'

function StatusLight(props) {
    return (
        <div className='status-light'>
            <span className={props.state}></span> {props.label}
        </div>
    )
}

export default StatusLight