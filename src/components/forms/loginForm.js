import React from 'react'
import Joi from '@hapi/joi'

import authService from '../../services/authService'

import Form from '../common/form'

class LoginForm extends Form {
    constructor(props) {
        super(props)

        this.state = {
            formData: { emailOrPhone: '', password: '' },
            errors: {}
        }

        this.schema = Joi.object({
            emailOrPhone: Joi.string().min(6).required().label('Email or Phone Number'),
            password: Joi.string().required().label('Password')
        })
    }

    async postForm() {
        try {
            const { emailOrPhone, password } = this.state.formData
            await authService.login(emailOrPhone, password)
            const { state } = this.props.location
            window.location = state ? `/#${state.from.pathname}` : '/#/dashboard'
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errors = { ...this.state.errors }
                errors.emailOrPhone = response.data
                this.setState({ errors })
            }
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput('emailOrPhone', 'Email or Phone Number')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        )
    }
}

export default LoginForm