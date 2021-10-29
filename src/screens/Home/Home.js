import React, { Component } from 'react'
import {connect} from 'react-redux'
import SockJsClient from 'react-stomp'

import { Box, Grid } from '@mui/material'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'
import {logout} from '../../redux/actions/authAction'

import './Home.css'

class Home extends Component {
    state = {
        searchValue: "",
        messageValue: "",
        selectedChatItem: {id: "1", avatar: "S", user: "Steve Rogers", recentMessage: "Hi there", dateTime: "10:27"},
        showEmojiPicker: false,
        chosenEmoji: null,
        anchorEl: null,
        openSearchModalForMobile: false,
        messages: []
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

    onConnected = () => {
        console.log("connected")
    }

    onDisconnected = () => {
        console.log("disconnected")
    }

    onMessageReceived = (payload) => {
        var messages = this.state.messages
        messages.push(payload)
        this.setState({ messages })
    }

    sendMessage = () => {
        const {messageValue} = this.state
        const user = this.props.authResponse
        this.clientRef.sendMessage('/app/sendMessage', JSON.stringify({
            content: messageValue,
            sender: user.username,
            receiver: "Steve"
        }))
    }

    handleSendOnClick = () => {
        const {messageValue} = this.state
        if (messageValue) {
            this.sendMessage()
        }
    }

    handleSearchOnClick = () => {
        const {searchValue} = this.state
        if (searchValue) {

        }
    }

    handleSearchModalOnClick = () => {
        this.setState({openSearchModalForMobile: !this.state.openSearchModalForMobile})
    }

    handleCancelOnClick = () => {
        this.setState({ searchValue: "" })
    }

    handleSettingsOnClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
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

    handleMenuItemOnPress = (item) => {
        switch(item) {
            case "Logout" : this.props.logout()
                break
            default: return
        }
    }

    handleInputOnChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    renderCardRight = () => {
        const {messageValue, selectedChatItem, showEmojiPicker, anchorEl} = this.state
        return (
            <div className = "card_right_content">
                <div className = "card_right_header">
                    <Header
                        selectedChatItem = {selectedChatItem}
                        handleSettingsOnClick = {this.handleSettingsOnClick}
                        handleClose = {this.handleMenuClose}
                        handleMenuItemOnPress = {this.handleMenuItemOnPress}
                        anchorEl = {anchorEl}
                        menuItems = {["Logout"]}
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
            <Grid container spacing = {2}>
                <Grid item xs = {12}>
                    { this.renderChatCard() }
                </Grid>
            </Grid>
        )
    }

    renderSockJsClient = () => {
        return (
            <SockJsClient url = 'http://localhost:9000/ws/'
                topics = {['/topic/public']}
                onConnect = {this.onConnected}
                onDisconnect = {this.onDisconnected}
                onMessage = {this.onMessageReceived}
                ref = {(client) => { this.clientRef = client }}
            />
        )
    }

    render() {
        return (
            <div className = "home_root">
                <div className = "chat_body">
                    <Box> 
                        { this.renderChatBody() } 
                    </Box>
                </div>
                { this.renderSockJsClient() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authResponse: state.auth.authResponse,
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => { dispatch(logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)