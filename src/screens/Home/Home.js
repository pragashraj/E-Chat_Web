import React, { Component } from 'react'
import {connect} from 'react-redux'

import { Box, Grid } from '@mui/material'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'
import {storeLoginResponse} from '../../redux/actions/authAction'

import './Home.css'

class Home extends Component {
    state = {
        searchValue: "",
        messageValue: "",
        selectedChatItem: {id: "1", avatar: "S", user: "Steve Rogers", recentMessage: "Hi there", dateTime: "10:27"},
        showEmojiPicker: false,
        chosenEmoji: null
    }

    dummyList = [
        {id: "1", avatar: "S", user: "Steve Rogers", recentMessage: "Hi there", dateTime: "10:27"},
        {id: "2", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "3", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
        {id: "4", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "5", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
        {id: "6", avatar: "P", user: "Palemo", recentMessage: "See you later", dateTime: "16:03"},
        {id: "7", avatar: "R", user: "Rogers", recentMessage: "Good Night", dateTime: "20:45"},
    ]

    dummyChats = [
        {id: "1", owner: "own", message: "Hello there, how are you", dateTime: "10:25"},
        {id: "2", owner: "op", message: "I'm fine", dateTime: "10:40"},
        {id: "3", owner: "op", message: "And you?", dateTime: "10:42"},
    ]

    handleSendOnClick = () => {

    }

    handleSearchOnClick = () => {

    }

    handleSearchModalOnClick = () => {

    }

    handleCancelOnClick = () => {

    }

    handleSettingsOnClick = () => {

    }

    handleEmojiOnClick = () => {
        this.setState({ showEmojiPicker: !this.state.showEmojiPicker })
    }

    handleChatListItemOnClick = (item) => {
        this.setState({ selectedChatItem: item })
    }

    handleEmojiOnSelect = (e, emoji) => {
        this.handleEmojiOnClick()
        this.setState({ chosenEmoji: emoji })
    }

    handleInputOnChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    renderCardRight = () => {
        const {messageValue, selectedChatItem, showEmojiPicker} = this.state
        return (
            <div className = "card_right_content">
                <div className = "card_right_header">
                    <Header
                        selectedChatItem = {selectedChatItem}
                        handleSettingsOnClick = {this.handleSettingsOnClick}
                    />
                </div>
                <div className = "card_right_body">
                    <Chat chats = {this.dummyChats}/>
                </div>
                <div className = "card_right_footer">
                    <Footer
                        value = {messageValue}
                        showEmojiPicker = {showEmojiPicker}
                        handleInputOnChange = {this.handleInputOnChange}
                        handleSendOnClick = {this.handleSendOnClick}
                        handleEmojiOnClick = {this.handleEmojiOnClick}
                        handleEmojiOnSelect = {this.handleEmojiOnSelect}
                    />
                </div>
            </div>
        )
    }

    renderCardLeft = () => {
        const {searchValue} = this.state
        return (
            <div className = "card_left_content">
                <Aside 
                    chatList = {this.dummyList} 
                    searchValue = {searchValue} 
                    handleInputOnChange = {this.handleInputOnChange}
                    handleChatListItemOnClick = {this.handleChatListItemOnClick}
                    handleSearchOnClick = {this.handleSearchOnClick}
                    handleSearchModalOnClick = {this.handleSearchModalOnClick}
                    handleCancelOnClick = {this.handleCancelOnClick}
                />
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
                    <Grid item xs = {8}>
                        <div className = "card_right">
                            { this.renderCardRight() }
                        </div>
                    </Grid>
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

const mapStateToProps = state => ({
    authResponse: state.auth.authResponse,
})

const mapDispatchToProps = dispatch => {
    return {
        storeLoginResponse: data => { dispatch(storeLoginResponse(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)