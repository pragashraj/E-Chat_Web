import React, { Component } from 'react'

import { Box, Grid } from '@mui/material'

import Aside from './Aside'

import './Home.css'

class Home extends Component {

    renderCardLeft = () => {
        return (
            <div className = "card_left_content">
                <Aside/>
            </div>
        )
    }

    renderChatCard = () => {
        return (
            <div className = "chat_card">
                <Grid container>
                    <Grid item xs = {4}>
                        <div className = "card_left">
                            { this.renderCardLeft() }
                        </div>
                    </Grid>
                    <Grid item xs = {8}></Grid>
                </Grid>
            </div>
        )
    }

    renderChatBody = () => {
        return (
            <Box>
                <Grid container spacing = {2}>
                    <Grid item xs = {12}>
                        { this.renderChatCard() }
                    </Grid>
                </Grid>
            </Box>
        )
    }

    render() {
        return (
            <div className = "home_root">
                <div className = "chat_body">
                    { this.renderChatBody() }
                </div>
            </div>
        )
    }
}

export default Home