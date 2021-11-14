import React, { Component } from 'react'
import {connect} from 'react-redux'
import SockJsClient from 'react-stomp'

import { Box, Grid, Fab } from '@mui/material'
import ExitToApp from '@mui/icons-material/ExitToApp'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import Chat from './Chat'
import Alert from '../../components/Alert'
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
        connected: false,
        selectedChatListType: "My chats",
        onlineUsers: [],
        myChats: [],
        chatListItems: [],
        openAlert: false
    }

    onConnected = () => {
        this.setState({ connected: true })
        const user = this.props.authResponse
        if (this.clientRef && user) {
            const data = { sender: user.username, type: "JOIN" }
            this.clientRef.sendMessage('/app/addUser', JSON.stringify(data))
        }
    }

    onDisconnected = () => {
        this.setState({ connected: false })
    }

    onMessageReceived = (payload) => {
        switch (payload.type) {
            case "JOIN": this.handleJoin(payload)
                break
            case "LEAVE" : this.handleLeave(payload)
                break
            case "CHAT": this.handleChatMessages(payload)
                break
            default : return
        }
    }

    handleJoin = (payload) => {
        const {onlineUsers} = this.state
        const username = this.props.authResponse.username
        const joiner = payload.username
        if (username !== joiner) {
            var existing = false

            for (let i = 0; i < onlineUsers.length; i++) {
                const existingUser = onlineUsers[i]
                if (existingUser.username === joiner) {
                    existing = true
                    break
                }
            }

            if (!existing) {
                const listItem = this.createListItem(onlineUsers.length.toString, joiner.charAt(0), joiner, true, [])
                onlineUsers.push(listItem)
                this.setState({ onlineUsers })
            }
        } 
        else {
            const myChatList = payload.myChatList
            var newList = []
            for (let i = 0; i < myChatList.length; i++) {
                const myChat = myChatList[i]
                const personName = myChat.secondaryContributor
                const item = this.createListItem(myChat.id, personName && personName.charAt(0), personName, false, myChat.chats)
                newList.push(item)
            }

            this.setState({ myChats: newList, chatListItems: newList})
        }
    }

    handleLeave = (payload) => {
        const {onlineUsers} = this.state
        const username = payload.username

        for (let i = 0; i < onlineUsers.length; i++) {
            var onlineUser = onlineUsers[i]
            
            if (onlineUser.username === username) {
                onlineUsers.pop(onlineUser)
                this.setState({ onlineUsers })
            }
        }
    }

    handleChatMessages = (payload) => {
        const currentUser = this.props.authResponse.username
        const {selectedChatItem, myChats} = this.state

        const {sender, receiver, chat} = payload

        if (sender === currentUser) 
        {
            selectedChatItem && selectedChatItem.chats.push(chat)
            this.setState({ selectedChatItem })
        }
        else if (sender !== currentUser && receiver === currentUser) 
        {
            var existing = false
            var existingMyChat = null

            for (let i = 0; i < myChats.length; i++) {
                const existingChat = myChats[i]
                if (existingChat.username === sender) {
                    existing = true
                    existingMyChat = existingChat
                    myChats.pop(existingChat)
                    break
                }
            }

            if (existing && existingMyChat) 
            {
                existingMyChat.chats.push(chat)
                myChats.push(existingMyChat)
                this.setState({ myChats })
            }
            else 
            {
                var chats = []
                chats.push(chat)
                const listItem = this.createListItem(myChats.length.toString, sender.charAt(0), sender, true, chats)
                myChats.push(listItem)
                this.setState({ myChats })
            }
        }
    }

    createChatMessageItem = (id, sender, reciever, message, dateTime, owner) => {
        return  { id, sender, reciever, message, dateTime, owner }
    }

    createListItem = (id, avatar, username, active, chats) => {
        const randX = Math.floor(Math.random() * 100)
        const randY = Math.floor(Math.random() * 200)

        return { id, avatar, username, active, randX, randY, chats }
    }

    sendMessage = () => {
        const {messageValue, selectedChatItem} = this.state
        const username = this.props.authResponse.username
        const data = {content: messageValue, sender: username, receiver: selectedChatItem.username, type: "CHAT"}
        this.clientRef.sendMessage('/app/sendMessage', JSON.stringify(data))
        this.setState({ messageValue: "" })
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

    handleOpenAlert = () => {
        this.setState({ openAlert: !this.state.openAlert })
    }

    handleEmojiOnSelect = (e, emoji) => {
        this.handleEmojiOnClick()
        this.setState({ chosenEmoji: emoji })
    }

    handleMenuItemOnPress = (item) => {
        switch(item) {
            default: return
        }
    }

    handleInputOnChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleListTypeOnChange = (e) => {
        const value = e.target.value
        const  {onlineUsers, myChats} = this.state

        let data = onlineUsers
        if (value === "My chats") {
            data = myChats
        }

        this.setState({ selectedChatListType: value, chatListItems: data })
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    handleLogout = () => {
        this.handleOpenAlert()
        this.props.logout()
        this.props.history.push("/")
    }

    renderAlertPopup = () => {
        const {openAlert} = this.state
        return (
            <Alert
                content = "Are you sure to logout?"
                open = {openAlert}
                handleConfirm = {this.handleLogout}
                handleClose = {this.handleOpenAlert}
            />
        )
    }

    renderFab = () => {
        return (
            <Fab 
                color = "secondary" 
                aria-label = "logour" 
                sx = {{bottom: "20px", position: "absolute", right: "20px"}}
                onClick = {this.handleOpenAlert}
            >
                <ExitToApp/>
            </Fab>
        )
    }

    renderCardRight = () => {
        const {messageValue, selectedChatItem, showEmojiPicker, anchorEl} = this.state
        const user = this.props.authResponse
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
                    <Chat selectedChatItem = {selectedChatItem} currentUser = {user}/>
                </div>
                <div className = "card_right_footer">
                    <Footer
                        value = {messageValue}
                        showEmojiPicker = {showEmojiPicker}
                        selectedChatItem = {selectedChatItem}
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
        const currentUser = this.props.authResponse
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
                    currentUser = {currentUser}
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
        const {openAlert} = this.state
        return (
            <div className = "home_root">
                <div className = "chat_body">
                    <Box> 
                        { this.renderChatBody() } 
                    </Box>
                </div>
                { this.renderFab() }
                { openAlert && this.renderAlertPopup() }
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