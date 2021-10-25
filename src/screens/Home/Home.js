import React, { Component } from 'react'

import { Box, Grid } from '@mui/material'

import Aside from './Aside'

import './Home.css'

class Home extends Component {

    dummyList = [
        {id: "1", avatar: "S", user: "Steve", recentMessage: "Hi there", dateTime: "10:27"},
        {id: "2", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "3", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
        {id: "4", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "5", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
        {id: "6", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "7", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
    ]

    renderCardLeft = () => {
        return (
            <div className = "card_left_content">
                <Aside chatList = {this.dummyList}/>
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