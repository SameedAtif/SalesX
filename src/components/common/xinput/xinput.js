import React from 'react'

const XInput = ({ name, label, error, ...rest }) => {
    return (
        <div className='form-group'>
            <label>{label}</label>
            <input name={name} {...rest} />
            <div className='alert alert-danger'>
                {error}
            </div>
        </div>
    )
}

export default XInput