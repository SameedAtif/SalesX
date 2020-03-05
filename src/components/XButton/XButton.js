import React from 'react'

import './XButton.css'

function XButton(props) {
    return (
        <div className='btn'>{props.text}</div>
    )
}

export default XButton