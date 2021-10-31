import React from 'react'

import Input from '../../components/Input'
import PrimaryButton from '../../components/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton'

import {Login} from '@mui/icons-material' 

import './SignUp.css'

const Form = ({
    email,
    username, 
    password,
    confirmPassword, 
    handleInputOnChange,
    handleCancelOnClick,
    handleSubmitOnClick
}) => {

    const renderHeader = () => {
        return (
            <div className = "form_header">
                <span className = "form_header_title">Sign Up</span>
                <Login sx = {{ color: "#fff", width: "30px", height: "30px"}}/>
            </div>
        )
    }

    const renderInput = (label, name, value, type) => {
        return (
            <div className = "form_input">
                <Input
                    handleInputOnChange = {handleInputOnChange}
                    size = "medium"
                    label = {label}
                    name = {name}
                    value = {value}
                    type = {type}
                />
            </div>    
        )
    }

    const renderSignInLink = () => {
        return (
            <div className = "form_signin-link_root">
                <a href = "/" className = "signin_link">Already have an account ?</a>
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
            { renderInput("Email", "email", email) }
            { renderInput("Username", "username", username) }
            { renderInput("Password", "password", password, "password") }
            { renderInput("Confirm Password", "confirmPassword", confirmPassword, "password") }
            { renderButtons() }
            { renderSignInLink() }
        </div>
    )
}

export default Form
