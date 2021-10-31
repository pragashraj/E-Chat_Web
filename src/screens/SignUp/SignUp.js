import React, { Component } from 'react'

import { Box, Grid, CssBaseline  } from '@mui/material'

import Form from './Form'
import SnackBar from '../../components/SnackBar'
import Loading from '../../components/Loading/Loading'
import {signUp} from '../../api/auth'

import './SignUp.css'
import signupCover from '../../assets/images/connect.jpg'

class SignUp extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        showSnackBar: false, 
        snackMessage: "", 
        severity: "",
        loading: false
    }

    handleSignUp = async(data) => {
        try {
            this.setState({ loading: false })
            const response = await signUp(data)
            if (response && response.success) {
                this.setSnackBar(response.message, "success")
            }
            this.setState({ loading: false, email: "", username: "", password: "", confirmPassword: "" })
        }
        catch (err) {
            this.setSnackBar(err.message, "error")
        }
    }

    handleSubmitOnClick = () => {
        const {email, username, password, confirmPassword} = this.state
        if (email && username && password && confirmPassword) {
            if (password === confirmPassword) {
                const data = {email, username, password}
                this.handleSignUp(data)
            }
            else {
                this.setSnackBar("Password & confirmPassword not matched", "error")
            }
        } 
        else {
            this.setSnackBar("Fields cannot be empty", "error")
        }
    }

    handleCancelOnClick = () => {
        this.setState({ email: "", username: "", password: "", confirmPassword: "" })
    }

    handleInputOnChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSnackBarClose = () => {
        this.setState({ showSnackBar: false, snackMessage: "", severity: "" })
    }

    setSnackBar = (message, severity) => {
        this.setState({ showSnackBar: true, snackMessage: message, severity })
    }

    renderSnackBar = () => {
        const {showSnackBar, snackMessage, severity} = this.state
        return <SnackBar
            open = {showSnackBar}
            message = {snackMessage}
            severity = {severity}
            align = {{ vertical: 'bottom', horizontal: 'right' }}
            handleClose = {this.handleSnackBarClose}
        />
    }

    renderMain = () => {
        const {email, username, password, confirmPassword} = this.state
        return (
            <Grid container>
                <CssBaseline />
                <Grid item xs = {false} sm = {4} md = {6}
                    sx = {{
                        backgroundImage: `url(${signupCover})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: "30px",
                        borderBottomLeftRadius: "30px"
                    }}
                />
                <Grid item xs = {12} sm = {8} md = {6}>
                    <Form
                        email = {email}
                        username = {username}
                        password = {password}
                        confirmPassword = {confirmPassword}
                        handleInputOnChange = {this.handleInputOnChange}
                        handleCancelOnClick = {this.handleCancelOnClick}
                        handleSubmitOnClick = {this.handleSubmitOnClick}
                    />
                </Grid>
            </Grid>
        )
    }

    render() {
        const { showSnackBar, loading } = this.state
        return (
            <div className = "signUp_root">
                <div className = "signUp_body">
                    <Box>
                        <div className = "signUp_card">
                            { this.renderMain() } 
                        </div>
                    </Box>
                </div>
                { showSnackBar && this.renderSnackBar() }
                { loading && <Loading open = {loading}/> }
            </div>
        )
    }
}

export default SignUp