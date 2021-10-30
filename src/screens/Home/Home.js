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
        selectedChatItem: null,
        showEmojiPicker: false,
        chosenEmoji: null,
        anchorEl: null,
        openSearchModalForMobile: false,
        broadcasts: [],
        joinedUsers: [],
        connected: false,
        selectedChatListType: "My chats",
        myChats: [],
        chatListItems: [],
        chatMessages: []
    }

    dummyChats = [
        {id: "1", owner: "own", message: "Hello there, how are you", dateTime: "10:25"},
    ]

    onConnected = () => {
        this.setState({ connected: true })
        const user = this.props.authResponse
        if (this.clientRef) {
            const data = { sender: user.username, type: "JOIN" }
            this.clientRef.sendMessage('/app/addUser', JSON.stringify(data))
        }
    }

    onDisconnected = () => {
        this.setState({ connected: false })
    }

    onMessageReceived = (payload) => {
        var broadcasts = this.state.broadcasts
        broadcasts.push(payload)
        this.setState({ broadcasts })

        switch (payload.type) {
            case "JOIN": this.handleJoin(payload)
                break
            case "LEAVE" : this.handleLeave(payload)
                break
            default : return
        }
    }

    handleJoin = (payload) => {
        const {joinedUsers} = this.state
        const user = this.props.authResponse
        const sender = payload.sender
        if (user.username !== sender) {
            const listItem = this.createListItem(joinedUsers.length.toString, sender.charAt(0), sender, "", "", true)
            joinedUsers.push(listItem)
            this.setState({ joinedUsers })
        }
    }

    handleLeave = (payload) => {
        const {joinedUsers} = this.state
        const sender = payload.sender

        for (let i = 0; i < joinedUsers.length; i++) {
            const user = joinedUsers[i]
            
            if (user.user === sender) {
                joinedUsers.pop(user)
                this.setState({ joinedUsers })
            }
        }
    }

    createListItem = (id, avatar, user, recentMessage, dateTime, active) => {
        const randX = Math.floor(Math.random() * 100)
        const randY = Math.floor(Math.random() * 200)

        return { id, avatar, user, recentMessage, dateTime, active, randX, randY }
    }

    sendMessage = () => {
        const {messageValue, selectedChatItem} = this.state
        const user = this.props.authResponse
        const data = {content: messageValue, sender: user.username, receiver: selectedChatItem.user}
        this.clientRef.sendMessage('/app/sendMessage', JSON.stringify(data))
    }

    handleSendOnClick = () => {
        const {messageValue, selectedChatItem} = this.state
        if (selectedChatItem && messageValue) {
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

    handleListTypeOnChange = (e) => {
        const value = e.target.value
        const  {joinedUsers, myChats} = this.state

        let data = joinedUsers
        if (value === "My chats") {
            data = myChats
        }

        this.setState({ selectedChatListType: value, chatListItems: data })
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    renderCardRight = () => {
        const {messageValue, selectedChatItem, showEmojiPicker, anchorEl, chatMessages} = this.state
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
                    <Chat chats = {chatMessages}/>
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
        const {searchValue, chatListItems, selectedChatListType} = this.state
        return (
            <div className = "card_left_content">
                <Aside 
                    chatList = {chatListItems} 
                    searchValue = {searchValue}
                    selectedChatListType = {selectedChatListType} 
                    handleInputOnChange = {this.handleInputOnChange}
                    handleChatListItemOnClick = {this.handleChatListItemOnClick}
                    handleSearchOnClick = {this.handleSearchOnClick}
                    handleSearchModalOnClick = {this.handleSearchModalOnClick}
                    handleCancelOnClick = {this.handleCancelOnClick}
                    handleListTypeOnChange = {this.handleListTypeOnChange}
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