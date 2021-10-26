import React from 'react'

import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'

import {Login} from '@mui/icons-material' 

import './SignIn.css'

const Form = ({
    username, 
    password, 
    handleInputOnChange,
    handleCancelOnClick,
    handleSubmitOnClick
}) => {

    const renderHeader = () => {
        return (
            <div className = "form_header">
                <span className = "form_header_title">Sign In</span>
                <Login sx = {{ color: "#fff", width: "30px", height: "30px"}}/>
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

    const renderForgotPassword = () => {
        return (
            <div className = "form_forgot_password_root">
                <span className = "form_forgot_password">Forgot password ?</span>
            </div>
        )
    }

    const renderButtons = () => {
        return (
            <div className = "form_btn_root">
                <div className = "form_btn">
                    <SecondaryButton title = "Cancel" onClick = {handleCancelOnClick}/>
                </div>
                <PrimaryButton title = "Submit" onClick = {handleSubmitOnClick}/>
            </div>
        )
    }

    return (
        <div className = "form_root">
            { renderHeader() }
            { renderInput("Username", "username", username) }
            { renderInput("Password", "password", password) }
            { renderForgotPassword() }
            { renderButtons() }
        </div>
    )
}

export default Form