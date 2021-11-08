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
        joinedUsers: [],
        connected: false,
        selectedChatListType: "My chats",
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
        const {joinedUsers, myChats} = this.state
        const user = this.props.authResponse
        const sender = payload.sender
        if (user.username !== sender) {
            var existing = false

            for (let i = 0; i < joinedUsers.length; i++) {
                const existingUser = joinedUsers[i]
                if (existingUser.user === sender) {
                    existing = true
                    break
                }
            }

            if (!existing) {
                const listItem = this.createListItem(
                    joinedUsers.length.toString, 
                    sender.charAt(0), 
                    sender, 
                    "", 
                    "", 
                    true, 
                    payload.messages ? payload.messages : []
                )
                joinedUsers.push(listItem)
                this.setState({ joinedUsers })
            }
        }

        var chatList = myChats
        for (let i = 0; i < payload.contactList.length; i++) {
            const contact = payload.contactList[i]
            const contactPerson = contact.contactPerson
            const list = this.createListItem(
                contact.id, 
                contactPerson.username.charAt(0), 
                contactPerson.username, 
                "", 
                "", 
                false, 
                contact.messages ? contact.messages : []
            )
            chatList.push(list)
        }

        this.setState({ myChats: chatList, chatListItems: chatList})
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

    handleChatMessages = (payload) => {
        const currentUser = this.props.authResponse.username
        if (payload.sender !== currentUser && payload.receiver === currentUser) {
            const {myChats} = this.state
            var existing = false

            for (let i = 0; i < myChats.length; i++) {
                const existingUser = myChats[i]
                if (existingUser.user === payload.sender) {
                    existing = true
                    break
                }
            }

            if (!existing) {
                const listItem = this.createListItem(
                    myChats.length.toString, 
                    payload.sender.charAt(0), 
                    payload.sender, 
                    "", 
                    "", 
                    true, 
                    payload.messages ? payload.messages : []
                )
                myChats.push(listItem)
                this.setState({ myChats })
            }
        }
    }

    createChatMessageItem = (id, sender, reciever, message, dateTime, owner) => {
        return  { id, sender, reciever, message, dateTime, owner }
    }

    createListItem = (id, avatar, user, recentMessage, dateTime, active, messages) => {
        const randX = Math.floor(Math.random() * 100)
        const randY = Math.floor(Math.random() * 200)

        return { id, avatar, user, recentMessage, dateTime, active, randX, randY, messages }
    }

    sendMessage = () => {
        const {messageValue, selectedChatItem} = this.state
        const username = this.props.authResponse.username
        const data = {content: messageValue, sender: username, receiver: selectedChatItem.user, type: "CHAT"}
        this.clientRef.sendMessage('/app/sendMessage', JSON.stringify(data))

        const rand = Math.floor(Math.random() * 100)
        const chatMessage = this.createChatMessageItem(
            rand, 
            username, 
            selectedChatItem.user, 
            messageValue, 
            this.getDateAndTime(new Date().toISOString()), 
            "own"
        )
        selectedChatItem.messages.push(chatMessage)
        this.setState({ messageValue: "", selectedChatItem })
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

    handleLogout = () => {
        this.handleOpenAlert()
        this.props.logout()
        this.props.history.push("/")
    }

    getDateAndTime = (date) => {
        if (date) {
            const dateSplits = date.split("T")
            const timeSplits = dateSplits[1].split("Z")[0].split(".")

            return dateSplits[0] + " " + timeSplits[0]
        }
        else {
            return null
        }
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
        const user = this.props.authResponse
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
                    currentUser = {user}
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