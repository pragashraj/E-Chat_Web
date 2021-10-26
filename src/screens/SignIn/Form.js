import React from 'react'

import Input from '../../components/Input'

import './SignIn.css'

const Form = ({username, password, handleInputOnChange}) => {

    const renderHeader = () => {
        return (
            <div className = "form_header">
                <span className = "form_header_title">Sign In</span>
            </div>
        )
    }

    const renderInput = (label, name, value) => {
        return (
            <div className = "form_input">
                <Input
                    handleInputOnChange = {handleInputOnChange}
                    size = "medium"
                    label = {label}
                    name = {name}
                    value = {value}
                />
            </div>    
        )
    }

    return (
        <div className = "form_root">
            { renderHeader() }
            { renderInput("Username", "username", username) }
            { renderInput("Password", "password", password) }
        </div>
    )
}

export default Form