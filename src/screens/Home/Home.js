import React, { Component } from 'react'

import { Box, Grid } from '@mui/material'

import './Home.css'

class Home extends Component {

    renderChatCard = () => {
        return (
            <div className = "chat_card">
                
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