import React, { Component } from 'react'
import {connect} from 'react-redux'
import SockJsClient from 'react-stomp'

import { Box, Grid } from '@mui/material'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'
import {logout} from '../../redux/actions/authAction'
import {createStompClient} from '../../utils/stompClient'

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

    stompClient = null

    componentDidMount() {
        const user = this.props.authResponse
        if (user) {
            this.stompClient = createStompClient()
            this.stompClient.connect({}, this.onConnected, this.onError)
        } 
        else {
            this.props.logout()
        }
    }

    onConnected = () => {
        const user = this.props.authResponse
        this.stompClient.subscribe('/topic/pubic', this.onMessageReceived)
        this.stompClient.send("/app/addUser", {}, JSON.stringify({ sender: user.username, type: 'JOIN' }))
    }

    onError = () => {
        
    }

    onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body)
        console.log(message)
    }

    sendMessage = () => {
        const {messageValue} = this.state
        this.stompClient.send('/app/sendMessage', {}, JSON.stringify({
            content: messageValue,
            sender: "Kamal",
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
            <SockJsClient url = 'http://localhost:8080/ws/'
                topics = {['/topic/public']}
                onConnect = {() => { console.log("connected") }}
                onDisconnect = {() => { console.log("Disconnected") }}
                onMessage = {(msg) => {
                    var messages = this.state.messages
                    messages.push(msg)
                    this.setState({ messages })
                }}
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