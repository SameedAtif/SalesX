import React from 'react'

import './XButton.css'

const XButton = (props) => {
    return (
        <span className='btn' onClick={props.clickHandler}>{props.text}</span>
    )
}

export default XButton