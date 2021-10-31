import React, { Component } from 'react'
import {connect} from 'react-redux'

import { Box, Grid, CssBaseline  } from '@mui/material'

import Form from './Form'
import SnackBar from '../../components/SnackBar'
import {storeLoginResponse} from '../../redux/actions/authAction'
import {signIn} from '../../api/auth'

import './SignIn.css'
import loginCover from '../../assets/images/connect.jpg'

class SignIn extends Component {
    state = {
        username: "",
        password: "",
        showSnackBar: false, 
        snackMessage: "", 
        severity: "",
        loading: false
    }

    handleSignIn = async(data) => {
        try {
            this.setState({ loading: false })
            const response = await signIn(data)
            if (response) {
                this.props.storeLoginResponse(response)
            }
            this.setState({ loading: false, username: "", password: "" })
        } 
        catch (err) {
            this.setSnackBar(err.message, "error")
        }
    }

    handleSubmitOnClick = () => {
        const {username, password} = this.state
        if (username && password) {
            const data = {username, password}
            this.handleSignIn(data)
        } 
        else {
            this.setSnackBar("Fields cannot be empty", "error")
        }
    }

    handleCancelOnClick = () => {
        this.setState({ username: "", password: "" })
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
        const {username, password} = this.state
        return (
            <Grid container>
                <CssBaseline />
                <Grid item xs = {false} sm = {4} md = {6}
                    sx = {{
                        backgroundImage: `url(${loginCover})`,
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
                        username = {username}
                        password = {password}
                        handleInputOnChange = {this.handleInputOnChange}
                        handleCancelOnClick = {this.handleCancelOnClick}
                        handleSubmitOnClick = {this.handleSubmitOnClick}
                    />
                </Grid>
            </Grid>
        )
    }

    render() {
        const { showSnackBar } = this.state
        return (
            <div className = "signIn_root">
                <div className = "signIn_body">
                    <Box>
                        <div className = "signIn_card">
                            { this.renderMain() } 
                        </div>
                    </Box>
                </div>
                { showSnackBar && this.renderSnackBar() }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLoginResponse: data => { dispatch(storeLoginResponse(data)) }
    }
}

export default connect(null, mapDispatchToProps)(SignIn)